# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Personalize
  include Document::Status
  include Document::Role
  include Document::Who

  self.table_name  = 'document_base'
  self.sequence_name = 'docbase_seq'
  self.set_integer_columns :status

  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  personalize 'sender'
  personalize 'owner'
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
  has_one :text, class_name: 'Document::Text', foreign_key: 'document_id'
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'
  has_many :comments, class_name: 'Document::Comment', foreign_key: 'document_id'

  def body; self.text.body if self.text.present? end
  def motions_waiting; self.motions_total - self.motions_completed - self.motions_canceled end
  def draft?; self.status == DRAFT end
  def sender_name; (self.sender_user || self.sender).to_s end

  def self.docnumber_eval(type, date)
    last_doc = Document::Base.where('docdate=? AND docnumber IS NOT NULL', date).order('id DESC').first
    last_number = '1'
    last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
    "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
  end

  def self.create_draft!(sender_user)
    raise 'sender not defined' if sender_user.blank?

    sender = whose_user(sender_user)
    docparams = {
      sender_user: sender_user, sender: sender,
      owner_user: sender_user, owner: sender,
      direction: 'inner', status: DRAFT,
      type: Document::Type.order('order_by').first
    }

    Document::Base.transaction do
      doc = Document::Base.create!(docparams)
      Document::User.upsert!(doc, sender_user, ROLE_OWNER, { is_new: 0, status: CURRENT })
      doc
    end
  end

  def update_draft!(user, params)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      if params.key?(:body)
        text = self.text || Document::Text.new(document: self)
        text.body = params[:body]
        text.save!
      end
      self.update_attributes(params.permit(:subject,:type_id,:docdate,:page_count,:additions_count, :direction, :original_number, :original_date))
      self.save!
    end
  end

  def delete_draft!(user)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      self.motions.destroy_all
      self.comments.destroy_all
      self.text.destroy if self.text
      Document::User.where(document_id: self.id).destroy_all
      self.destroy
    end
  end

  def send_draft!(user)
    raise I18n.t('models.document_base.errors.no_privilege_to_send') unless user == self.owner_user
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    raise I18n.t('models.document_base.errors.empty_subject') unless self.subject.present?
    raise I18n.t('models.document_base.errors.empty_body') unless self.body.present?
    raise I18n.t('models.document_base.errors.no_motions') unless self.motions.any?
    Document::Base.transaction do
      docuser = Document::User.where(document: self, user: user).first
      self.status = docuser.status = CURRENT
      self.docdate = self.docdate || Date.today
      self.docnumber = Document::Base.docnumber_eval(self.type, self.docdate)
      self.sent_at = self.received_at = Time.now
      self.motions.order('ordering ASC, id ASC').each do |motion|
        motion.send_draft!(user)
      end
      docuser.save!
      self.save!
    end
  end

  def send_draft_motions!(user)
    raise I18n.t('models.document_base.errors.no_privilege_to_send') unless user == self.owner_user
    Document::Base.transaction do
      self.motions.where(status: DRAFT, parent_id: nil).each do |motion|
        motion.send_draft!(user)
      end
    end
  end

### old API

  def revisit_motions!
    if self.status == DRAFT
      self.motions.each do |motion|
        motion.update_attributes!(status: DRAFT)
      end
    else
      if self.status != DRAFT
        self.motions.where(receiver_user_id: nil).each do |motion|
          motion.update_attributes!(status: NOT_SENT) 
        end
      end

      sent_motions = self.motions.where('status NOT IN ?', [ NOT_SENT ]).order('ordering')

      if sent_motions.any?
        prev_ordering = -1
        prev_all_complete = true
        curr_all_complete = true
        sent_motions.each do |motion|
          if prev_ordering != motion.ordering
            prev_ordering = motion.ordering
            prev_all_complete = curr_all_complete
            curr_all_complete = true
          end
          if prev_all_complete and motion.status == DRAFT
            motion.update_attributes!(status: CURRENT)
            Document::User.upsert!(self, motion.receiver_user, motion.receiver_role, { status: CURRENT, is_new: 1 })
            curr_all_complete = false
          elsif motion.status != COMPLETED
            curr_all_complete = false
          end
        end
      else
        self.update_attributes!(status: NOT_SENT)
      end

      # statistics
      self.motions_completed = self.motions.where('status IN ? and parent_id IS NULL', [ COMPLETED ]).count
      self.motions_canceled = self.motions.where('status IN ? and parent_id IS NULL', [ CANCELED ]).count
      self.motions_total = self.motions.where('parent_id IS NULL').count
      self.save!
    end
  end

  def self.sending_document(sender_user, opts = {})
    raise 'sender not defined' if sender_user.blank?
    sender = whose_user(sender_user)
    status = status_eval(opts)
    raise 'not supported status' unless OPEN_STATUSES.include?(status)
    owner_user, owner = who_eval(:owner, opts)
    ( owner_user = sender_user ; owner = sender ) if owner_user.blank?

    subject = opts[:subject] ; body = opts[:body]
    raise 'subject not defined' if subject.blank?
    type = Document::Type.find(opts[:type_id])
    date = Date.eval(opts[:docdate]) || Date.today
    numb = Document::Base.docnumber_eval(type, status, date)
    direction = opts[:direction] || 'inner'
    if direction == 'in'
      original_number = opts[:original_number]
      original_date = Date.eval(opts[:original_date])
    end
    page_count = opts[:page_count] || 0 ; additions_count = opts[:additions_count] || 0
    docparams = {
      language: opts[:language] || 'KA',
      parent: nil,
      type: type,
      direction: direction,
      subject: subject,
      original_number: original_number,
      original_date: original_date,
      docnumber: numb,
      docdate: date,
      docyear: date.year,
      page_count: page_count,
      additions_count: additions_count,
      # due_date: nil,
      # alarm_date: nil,
      status: status,
      sender_user: sender_user,
      sender: sender,
      owner_user: owner_user,
      owner: owner
    }
    motionparams = opts[:motions_attributes] || opts[:motions] || []
    raise 'document cannot be sent with empty receivers list' if (status == CURRENT and motionparams.select{|x| not x[:_deleted]}.blank?)

    Document::Base.transaction do
      if opts[:id]
        doc = Document::Base.find(opts[:id])
        doc.update_attributes!(docparams)
      else
        doc = Document::Base.create!(docparams)
      end

      Document::User.upsert!(doc, owner_user,  ROLE_OWNER,   { is_new: 1 })
      Document::User.upsert!(doc, sender_user, ROLE_CREATOR, { is_new: 0 })

      # generate motions
      motionparams.each do |motion_opts|
        id = motion_opts[:id]
        if motion_opts[:_deleted]
          Document::Motion.find(id).destroy
        else
          receiver_user, receiver = who_eval(:receiver, motion_opts)
          motion_text = motion_opts[:motion_text]
          due_date = Date.eval(motion_opts[:due_date])
          ordering = motion_opts[:ordering] || Document::Motion::MAX
          receiver_role = motion_opts[:receiver_role] || Document::Motion::ROLE_ASSIGNEE
          if due_date
            doc.due_date = due_date if (doc.due_date.blank? or doc.due_date < due_date)
            doc.alarm_date = due_date if (doc.alarm_date.blank? or doc.alarm_date > due_date)
          end
          params = {
            parent: nil,
            document: doc,
            status: DRAFT,
            due_date: due_date,
            ordering: ordering,
            motion_text: motion_text, 
            sender_user: sender_user,
            sender: sender,
            response_text: nil,
            receiver_user: receiver_user,
            receiver: receiver,
            receiver_role: receiver_role
          }
          if id
            Document::Motion.find(id).update_attributes!(params)
          else
            Document::Motion.create!(params)
          end
        end
      end

      # update body
      text = doc.text || Document::Text.new(document: doc)
      text.body = body
      text.save!

      # save
      doc.save!

      # check motions
      doc.revisit_motions!

      return doc
    end
  end

  def respond(by_user, opts = {})
    # get Document::User
    docuser = Document::User.where(document: self, user: by_user).first
    raise "action not allowed" if docuser.blank?

    # send comment
    old_status = docuser.status
    status = Document::Base.status_eval(opts.merge(default_status: COMPLETED))
    text = opts[:response_text]
    operation = Document::Comment.eval_operation(docuser.role, old_status, status)
    Document::Comment.create!({
      document: self,
      user: by_user,
      status: status,
      operation: operation,
      text: text
    })
    self.update_attributes!(comments_total: Document::Comment.where(document: self).count)

    # if user is the owner, than update doc status too
    self.update_attributes!(status: status) if docuser.role == ROLE_OWNER

    Document::User.where(document: self).each do |docuser|
      if docuser.user == by_user
        docuser.update_attributes!({ status: status })
        # docuser.read!
        docuser.changed = false
        docuser.new = false
      else
        # docuser.unread!
        docuser.changed = true
      end
      docuser.save!
    end

    # update related motions
    user_motions = self.motions.where(receiver_user: by_user)
    if user_motions.count > 0
      user_motions.each do |motion|
        motion.update_attributes!({
          status: status,
          response_text: text
        })
      end
      revisit_motions!
    end
  end

  def resend(sender_user, opts = {})
    raise 'sender not defined' if sender_user.blank?
    sender = Document::Base.whose_user(sender_user)
    parent = Document::Motion.find(opts[:parent_id]) if opts[:parent_id].present?
    raise 'only owner can operate on top level' if (parent.blank? and sender_user != self.owner_user)
    raise 'not user\'s motion' if (parent.present? and parent.receiver_user != sender_user)
    motionparams = opts[:motions_attributes] || opts[:motions] || []
    Document::Base.transaction do
      motionparams.each do |motion_opts|
        id = motion_opts[:id]
        if motion_opts[:_deleted]
          motion = Document::Motion.find(id)
          motion.destroy if motion.can_destroy?
        else
          receiver_user, receiver = Document::Base.who_eval(:receiver, motion_opts)
          motion_text = motion_opts[:motion_text]
          due_date = Date.eval(motion_opts[:due_date])
          ordering = motion_opts[:ordering] || Document::Motion::MAX
          receiver_role = motion_opts[:receiver_role] || Document::Motion::ROLE_ASSIGNEE
          # if due_date
          #   doc.due_date = due_date if (doc.due_date.blank? or doc.due_date < due_date)
          #   doc.alarm_date = due_date if (doc.alarm_date.blank? or doc.alarm_date > due_date)
          # end
          params = {
            parent: parent,
            document: self,
            status: DRAFT,
            due_date: due_date,
            ordering: ordering,
            motion_text: motion_text, 
            sender_user: sender_user,
            sender: sender,
            response_text: nil,
            receiver_user: receiver_user,
            receiver: receiver,
            receiver_role: receiver_role
          }
          if id
            Document::Motion.find(id).update_attributes!(params)
          else
            Document::Motion.create!(params)
          end
        end
      end
      self.save!
      self.revisit_motions!
      return self
    end
  end
end
