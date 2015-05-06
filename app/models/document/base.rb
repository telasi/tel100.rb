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
  has_many :users, class_name: 'Document::User', foreign_key: 'document_id'
  before_save :on_before_save

  def body; self.text.body if self.text.present? end
  def motions_waiting; self.motions_total - self.motions_completed - self.motions_canceled end
  def draft?; self.status == DRAFT end
  def sender_name; (self.sender_user || self.sender).to_s end
  def is_reply?; Document::Relation.where(base_id: self.id).any? end

  def self.docnumber_eval(type, date)
    last_doc = Document::Base.where('docdate=? AND docnumber IS NOT NULL', date).order('id DESC').first
    last_number = '1'
    last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
    "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
  end

  def self.create_draft!(sender_user)
    raise 'sender not defined' if sender_user.blank?

    sender = whose_user(sender_user)
    docparams = { sender_user: sender_user, sender: sender, owner_user: sender_user, owner: sender,
      direction: 'inner', status: DRAFT, type: Document::Type.order('order_by').first }

    Document::Base.transaction do
      doc = Document::Base.create!(docparams)
      motionparams = {document_id: doc.id, is_new: 0, ordering: 0, sender_user: sender_user, sender: sender,
        receiver_user: sender_user, receiver: sender, receiver_role: ROLE_SENDER, status: DRAFT,
        created_at: Time.now, sent_at: Time.now, received_at: Time.now}
      Document::Motion.create!(motionparams)
      Document::User.create!(document_id: doc.id, user_id: sender_user.id, is_new: 0, is_changed: 0).calculate!
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
      if params.respond_to?(:permit)
        params = params.permit(:subject,:docnumber,:type_id,:docdate,:due_date,:page_count,:additions_count,:direction,:original_number,:original_date)
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
    raise I18n.t('models.document_base.errors.no_privilege_to_send') unless user == self.owner_user
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    raise I18n.t('models.document_base.errors.empty_subject') unless self.subject.present?
    #raise I18n.t('models.document_base.errors.empty_body') unless self.body.present?
    raise I18n.t('models.document_base.errors.no_motions') unless self.motions.any?
    Document::Base.transaction do
      self.status = CURRENT
      self.docdate = Date.today if self.docdate.blank?
      self.docnumber = Document::Base.docnumber_eval(self.type, self.docdate) if self.docnumber.blank?
      self.sent_at = self.received_at = Time.now
      self.save!
      self.motions.order('ordering ASC, id ASC').each { |motion| motion.send_draft!(user)} 
      self.users.each { |user| user.calculate! }
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

  def add_comment(user, params)
    raise 'status not supported' if [ DRAFT, SENT, NOT_SENT, NOT_RECEIVED ].include?(self.status)
    raise 'not your document' unless (self.owner?(user) || self.author?(user))
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
      Document::Comment.create!(document: self, motion: nil, user: user,
        status: new_status, old_status: self.status, role: ROLE_OWNER,
        text: text)
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
    end
  end

  def authors;
    motions = self.author_motions
    if motions.any?
      motions.map{ |m| m.receiver }
    else
      [ self.owner ]
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

  private

  def on_before_save
    self.docyear = self.docdate.year if self.docdate
  end
end
