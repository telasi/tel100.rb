# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Personalize
  include Document::Direction
  include Document::Status
  include Document::Role
  include Document::Who

  self.table_name  = 'document_base'
  self.sequence_name = 'docbase_seq'
  self.set_integer_columns :status

  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  belongs_to :actual_sender, class_name: 'Sys::User', foreign_key: 'actual_sender_id'
  personalize 'sender'
  personalize 'owner'
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
  has_one :text, class_name: 'Document::Text', foreign_key: 'document_id'
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'
  has_many :comments, class_name: 'Document::Comment', foreign_key: 'document_id'
  has_many :users, class_name: 'Document::User', foreign_key: 'document_id'
  before_save :on_before_save

  def body; self.text.body if self.text.present? end
  def motions_waiting; self.motions_total - self.motions_completed - self.motions_canceled end
  def draft?; self.status == DRAFT end
  def sender_name; (self.sender_user || self.sender).to_s end
  def is_reply?; Document::Relation.where(base_id: self.id).any? end

  def is_editable?(user); 
    return false if self.author_motions.where(status: COMPLETED).any?
    return false if self.signee_motions.where(receiver_user: user, status: COMPLETED).any?
    author?(user) || owner?(user) || signee?(user)
  end

  def has_history?; Document::Change.where(document: self).any? end

  def self.docnumber_eval(type, date)
    last_doc = Document::Base.where('docdate=? AND docnumber IS NOT NULL', date).order('id DESC').first
    last_number = '1'
    last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
    "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
  end

  def self.create_draft!(sender_user)
    raise 'sender not defined' if sender_user.blank?
    sender = whose_user(sender_user)
    docparams = { sender_user: sender_user, sender: sender,
      owner_user: sender_user, owner: sender,
      actual_sender: nil, # it's not sent yet
      direction: INNER, status: DRAFT,
      type: Document::Type.order('order_by').first }
    Document::Base.transaction do
      doc = Document::Base.create!(docparams)
      motionparams = { document_id: doc.id, is_new: 0, ordering: 0,
        sender_user: sender_user, sender: sender, actual_sender: nil, # it's not sent yet
        receiver_user: sender_user, receiver: sender, receiver_role: ROLE_SENDER, status: DRAFT,
        created_at: Time.now, sent_at: Time.now, received_at: Time.now}
      Document::Motion.create!(motionparams)
      Document::User.create!(document_id: doc.id, user_id: sender_user.id, is_new: 0, is_changed: 0).calculate!
      return doc
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
      if params.respond_to?(:permit)
        params = params.permit(:subject,:docnumber,:docnumber2,:type_id,:docdate,:due_date,:page_count,:additions,:direction,:original_number,:original_date)
      else
        params = params.dup.except(:body)
      end
      self.update_attributes(params)
      self.save!
    end
  end

  def delete_draft!(user)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      self.motions.destroy_all
      self.comments.destroy_all
      Document::Relation.where(base_id: self.id).destroy_all
      self.text.destroy if self.text
      Document::User.where(document_id: self.id).destroy_all
      self.destroy
    end
  end

  def send_draft!(user)
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    raise I18n.t('models.document_base.errors.empty_subject') unless self.subject.present?
    raise I18n.t('models.document_base.errors.no_motions') unless self.motions.any?

    if self.direction == INNER and not self.inner?
      raise I18n.t('models.document_base.errors.inner_has_outer_parties')
    elsif self.direction != INNER and self.inner?
      raise I18n.t('models.document_base.errors.outer_doesnot_have_outer_parties')
    end

    Document::Base.transaction do
      self.status = CURRENT
      self.docdate = Date.today if self.docdate.blank?
      self.docnumber = Document::Base.docnumber_eval(self.type, self.docdate) if self.docnumber.blank?
      self.sent_at = self.received_at = Time.now
      self.actual_sender = user
      self.save!
      self.motions.order('ordering ASC, id ASC').each { |motion| motion.send_draft!(user)}
      check_auto_assignees!(user)
      check_auto_signees!(user)
      self.users.each { |user| user.calculate! }
    end
  end

  # Checks auto-assignees to receive the document.
  def check_auto_assignees!(user)
    # ignore inner documents
    return if self.direction == INNER
    # calculate auto assingees
    receiver_ids = self.motions.where(status: CURRENT).to_a.map{ |motion| motion.receiver_user }.flatten.map{|user| user.id}.uniq
    auto_assignee_ids = Sys::UserRelation.where(role: ROLE_AUTO_ASSIGNEE).where('USER_ID IN (?)', receiver_ids).to_a.map{ |rel| rel.related_id }.uniq
    # process each auto-assignee
    send_type_direction = Document::ResponseTypeDirection::SEND
    send_type = Document::ResponseType.where(direction: send_type_direction, role: ROLE_AUTO_ASSIGNEE).first
    auto_assignee_ids.each do |auto_assignee_id|
      unless self.motions.where(receiver_user_id: auto_assignee_id).any?
        motion = Document::Motion.create!(document: self, parent: nil, is_new: 1, ordering: Document::Motion::MAX,
          send_type: send_type, sender_user: user, receiver_user_id: auto_assignee_id, receiver_role: ROLE_ASSIGNEE, status: SENT,
          sent_at: Time.now, received_at: Time.now)
        docuser = Document::User.create!(document: self, user_id: auto_assignee_id, is_new: 1, is_changed: 1)
      end
    end
  end

  # Check auto-signees to receive the document.
  def check_auto_signees!(user)
    return unless AUTO_SIGNEE_DOCTYPES.include?(self.type_id)
    unless self.motions.where(receiver_user_id: AUTO_SIGNEE).any?
      send_type = Document::ResponseType.find(AUTO_SIGNEE_RESPONSE_TYPE)
      motion = Document::Motion.create!(document: self, parent: nil, is_new: 1, ordering: Document::Motion::ORDERING_AUTO_SIGNEE,
        send_type: send_type, sender_user: user, receiver_user_id: AUTO_SIGNEE, receiver_role: ROLE_SIGNEE, status: SENT,
        sent_at: Time.now, received_at: Time.now)
      docuser = Document::User.create!(document: self, user_id: AUTO_SIGNEE, is_new: 1, is_changed: 1)
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

  def add_comment(user, params, actual_user = nil)
    is_owner = self.owner_user == user
    is_sender = self.sender_user == user
    if is_owner and is_sender
      status_updated = add_document_comment(user, params, actual_user)
      if status_updated
        motion = self.motions.where(receiver_user: user, parent_id: nil).first
        motion.add_comment(user, params, actual_user) if motion.present?
      end
    elsif is_owner
      add_document_comment(user, params, actual_user)
    elsif is_sender
      motion = self.motions.where(receiver_user: user, parent_id: nil).first
      return motion.add_comment(user, params, actual_user) if motion.present?
    else
      raise 'cannot add comment here'
    end
  end

  def authors;
    motions = self.author_motions
    if motions.any?
      motions.map{ |m| ( m.receiver || m.receiver_user ) }
    else
      [ self.owner || self.owner_user ]
    end
  end

  def signees
    self.signee_motions.map{ |m| m.receiver }
  end

  def assignees
    self.assignee_motions.map{ |m| m.receiver }
  end

  def author_motions
    self.motions.where(receiver_role: ROLE_AUTHOR)
  end

  def signee_motions
    self.motions.where(receiver_role: ROLE_SIGNEE)
  end

  def assignee_motions
    self.motions.where(receiver_role: ROLE_ASSIGNEE)
  end

  def author?(user)
    return true if self.sender_user == user
    return true if self.author_motions.where(receiver_user: user).any?
    false
  end

  def owner?(user)
    self.owner_user == user
  end

  def signee?(user)
    self.signee_motions.where(receiver_user: user).any?
  end

  def inner?
    self.motions.each do |motion|
      return false unless motion.inner?
    end
    return true
  end

  def modify(params, user)
    motions = JSON.parse(params[:motions])
    should_reset_signees = false

    #check if changes were made
    dirty = false
    dirty = self.text.body != params[:body] if params[:body].present?
    dirty = self.subject != params[:subject] if params[:subject].present?
    dirty ||= Document::FileTemp.where(document: self).where('state in (?)', [Document::Change::STATE_TEMP, Document::Change::STATE_DELETED]).any?
    
    # reset signees if text and files are dirty
    # if assignees are dirty is checked below
    should_reset_signees = dirty 

    dirty = self.docnumber != params[:docnumber] if params[:docnumber].present?
    dirty ||= !motions.empty?
    return if not dirty

    Document::Base.transaction do
      change = Document::Change.new(document_id: params[:id], user: user, created_at: Time.now)
      change.save!
      # Save text to history
      histext = Document::History::Text.new(document: self)
      if self.text
        histext.body = self.text.body
      else
        histext.body = ""
      end
      histext.subject = self.subject
      histext.docnumber = self.docnumber
      histext.change_no = change.id
      histext.save!

      self.subject = params[:subject]
      self.docnumber = params[:docnumber]
      # new text
      text = self.text || Document::Text.new(document: self)
      text.body = params[:body] || self.text.body
      text.save!

      # Save files to history
      Document::File.where(document: self).map do |f|
        hisfile = Document::History::File.new(document: self, original_name: f.original_name, store_name: f.store_name, change_no: change.id)
        hisfile.save!
        f.delete
      end
      # Save new files
      Document::FileTemp.where(document: self).map do |f|
        if f.state == Document::Change::STATE_TEMP || f.state == Document::Change::STATE_CURRENT
          newfile = Document::File.new(document: self, original_name: f.original_name, store_name: f.store_name)
          newfile.save
        end
        f.delete
      end
      # motions

      # save all motions to history table
      self.assignee_motions.map do |m|
        hismotion = Document::History::Motion.new(m.attributes.merge({id: nil}))
        hismotion.change_no = change.id
        hismotion.save!
      end

      self.signee_motions.map do |m|
        hismotion = Document::History::Motion.new(m.attributes.merge({id: nil}))
        hismotion.change_no = change.id
        hismotion.save!
      end

      # process motions
      motions.each do |m|
        if m["deleted"]
          motion = Document::Motion.find(m["id"])
          motion.delete
        end
        if m["temp"]
          motion_params = {
            document_id:    params[:id],
            parent_id:      nil,
            receiver_role:  m["receiver_role"],
            receiver_id:    m["receiver_id"],
            receiver_type:  m["receiver_type"],
            ordering:       m["ordering"],
            send_type_id:   m["send_type_id"],
            due_date:       m["due_date"]
          }
          motion = Document::Motion.create_draft!(user, motion_params)
          motion.send_draft!(user)
        end

        should_reset_signees = true if m["receiver_role"] == 'assignee'
      end

      motions_to_process = self.motions.where('status IN (?) AND receiver_role = ?', [SENT, CURRENT], ROLE_SIGNEE).order(:ordering)
      if motions_to_process.count > 0
        ordering = motions_to_process.minimum('ordering')
        motions_to_process = motions_to_process.where(ordering: ordering)
        motions_to_process.each do |motion_to_process|
          docuser = Document::User.upsert!(motion_to_process.document, motion_to_process.receiver_user, motion_to_process.receiver_role, { status: CURRENT })
          motion_to_process.status = CURRENT
          motion_to_process.received_at = Time.now
          motion_to_process.save!
          docuser.calculate!
        end
      end

      reset_signees if should_reset_signees
    end

  end

  private

  def on_before_save
    self.docyear = self.docdate.year if self.docdate
  end

  def add_document_comment(user, params, effective_user)
    raise 'status not supported' if [ DRAFT, SENT, NOT_SENT, NOT_RECEIVED ].include?(self.status)
    # calculate new status
    new_status = self.status
    type = Document::ResponseType.find(params[:response_type_id]) if params[:response_type_id].present?
    if type.blank? and params[:response_type].present?
      type = Document::ResponseType.where(role: ROLE_OWNER, direction: params[:response_type]).order(:ordering).first
    end
    if type and type.positive?
      new_status = COMPLETED
    elsif type and type.negative?
      new_status = CANCELED
    end
    # adding comment
    Document::Comment.transaction do
      # S1: create comment
      text = params[:text] if params[:text].present?
      Document::Comment.create!(document: self, motion: nil,
        user: user, actual_user: effective_user, role: ROLE_OWNER,
        status: new_status, old_status: self.status, text: text)
      # S2: update document itself
      status_updated = false
      if self.status != new_status
        raise 'cannot change status' if self.status == CANCELED
        self.completed_at = Time.now
        self.status = new_status
        self.save!
        status_updated = true
      end
      # S3: document_user updates
      docuser = Document::User.upsert!(self, user, ROLE_OWNER, { status: new_status, is_new: 0 })
      docuser.make_others_unread!
      docuser.calculate!
      # S4: if document was canceled mark current motions as not received
      if self.status == CANCELED and status_updated
        self.update_attributes!(status: CANCELED)
        self.motions.where('status IN (?)', [ SENT, CURRENT ]).each do |motion|
          motion.update_attributes!(status: NOT_RECEIVED)
          docuser = self.users.where(user: motion.receiver_user).first
          docuser.calculate!
        end
      end

      ####
      return status_updated
    end
  end

  def reset_signees
    self.signee_motions.where('status IN (?)', [ COMPLETED, CANCELED ]).map do |smotion|
      smotion.status = CURRENT
      smotion.resp_type_id = nil
      smotion.save

      receiver_du = smotion.document.users.where(user: smotion.receiver_user).first
      receiver_du.calculate! if receiver_du.present?
    end
  end
end
