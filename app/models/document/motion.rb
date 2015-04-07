# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  include Document::Status
  include Document::Role
  include Document::Who
  MIN = 1
  MAX = 999

  ORDERING_SINGEE  = 1
  ORDERING_ASIGNEE = 500
  ORDERING_AUTHOR  = 900

  include Document::Personalize
  include Document::Status
  include Document::Role
  self.table_name  = 'document_motion'
  self.sequence_name = 'docmotion_seq'
  self.set_integer_columns :status, :is_new

  belongs_to :document, class_name: 'Document::Base'
  belongs_to :parent, class_name: 'Document::Motion'
  belongs_to :send_type, class_name: 'Document::ResponseType', foreign_key: 'send_type_id'
  belongs_to :response_type, class_name: 'Document::ResponseType', foreign_key: 'resp_type_id'
  personalize 'receiver'
  personalize 'sender'
  personalize 'owner'

  def new=(val); self.is_new = val ? 1 : 0 end
  def new?; self.is_new == 1 end
  def can_destroy?; self.new? end
  def draft?; self.status == DRAFT end
  def can_edit?(user); self.sender_user == user end
  def sender_name; (self.sender_user || self.sender).to_s end
  def receiver_name;  (self.receiver_user || self.receiver).to_s end

  def self.create_draft!(sender_user, params)
    document_id = params[:document_id] ; parent_id = params[:parent_id]
    document = Document::Base.find(document_id)
    parent = Document::Motion.find(parent_id) if parent_id.present?
    # check user permission for this action
    is_receiver_user = ( parent.present? and sender_user == parent.receiver_user )
    is_owner_user = ( parent.blank? and sender_user == document.owner_user )
    raise I18n.t('models.document_motion.errors.no_privilege_to_add') unless is_receiver_user or is_owner_user
    # sender/receiver information
    sender = whose_user(sender_user)
    receiver_user, receiver = who_eval('receiver', params)
    same_receiver_user = ( receiver_user.present? and sender_user == receiver_user )
    same_receiver = ( receiver.present? and sender.present? and sender == receiver )
    raise I18n.t('models.document_motion.errors.sent_to_himself') if (same_receiver or same_receiver_user)
    # check existence of this receiver on the branch
    receiver_count = receiver.present? ? document.motions.where(parent_id: parent_id, receiver: receiver).count : 0
    receiver_user_count = receiver_user.present? ? document.motions.where(parent_id: parent_id, receiver_user: receiver_user).count : 0
    raise I18n.t('models.document_motion.errors.receiver_exists_on_branch') if ( receiver_count > 0 or receiver_user_count > 0 )
    # get ordering
    role = params[:receiver_role]
    if params[:ordering].blank?
      case params[:receiver_role]
      when ROLE_ASSIGNEE
        ordering = ORDERING_ASIGNEE
      when ROLE_SIGNEE
        ordering = ORDERING_SINGEE + document.motions.where(parent: parent, receiver_role: ROLE_SIGNEE).count
      else
        ordering = ORDERING_AUTHOR
      end
    else
      ordering = params[:ordering]
    end
    # get send_type
    send_type = Document::ResponseType.find(params[:send_type_id]) if params[:send_type_id].present?
    send_type = Document::ResponseType.send_types.where(role: role).order(:ordering).first if send_type.blank?
    # create this
    Document::Motion.create!({
      parent: parent,
      document: document,
      status: DRAFT,
      sender_user: sender_user,
      sender: sender,
      receiver_user: receiver_user,
      receiver: receiver,
      receiver_role: role,
      ordering: ordering,
      send_type: send_type,
      is_new: true
    })
  end

  def send_draft_motions!(user)
    raise I18n.t('models.document_motion.errors.no_privilege_to_send') unless user == self.receiver_user
    Document::Motion.transaction do
      Document::Motion.where(status: DRAFT, parent: self).order('ordering').each do |motion|
        motion.send_draft!(user)
      end
    end
  end

  def update_draft!(user, params)
    raise I18n.t('models.document_motion.errors.not_a_draft') unless self.draft?
    raise I18n.t('models.document_motion.errors.not_allowed') unless self.can_edit?(user)
    Document::Motion.transaction do
      self.update_attributes(params.permit(:ordering, :due_date, :motion_text, :receiver_role, :send_type_id))
      self.save!
    end
  end

  def delete_draft!(user)
    raise 'not a draft' unless self.draft?
    raise 'don\'t have delete permission' unless self.can_edit?(user)
    self.destroy
  end

  def send_draft!(user)
    raise I18n.t('models.document_motion.errors.not_a_draft') unless self.draft?
    # raise 'don\'t have send permission' unless self.can_edit?(user)
    rel = Document::Motion.where(document: self.document, parent: self.parent)
    # checking if there are some motions above this motion
    upper = rel.where('ordering > ? AND status NOT IN (?)', self.ordering, [DRAFT]).count
    raise I18n.t('models.document_motion.errors.cannot_send_from_this_level') if upper > 0
    # sending this motion
    self.sent_at = Time.now
    self.status = self.receiver_user.blank? ? NOT_SENT : SENT
    if self.status == SENT
      # try to make this motion current
      lower = rel.where('ordering < ? AND status IN (?)', self.ordering, [SENT,CURRENT,NOT_RECEIVED,CANCELED]).count
      if lower == 0
        self.status = CURRENT
        self.received_at = Time.now
      end
      # create new Document::User
      Document::User.upsert!(self.document, self.receiver_user, self.receiver_role, { status: self.status })
    end
    # save motion data
    self.save!
    # calculate this Document::User
    self.document.users.where(user: user).first.calculate!
  end

  def add_comment(user, params)
    raise 'status not supported' if [ DRAFT, SENT, NOT_SENT, NOT_RECEIVED ].include?(self.status)
    raise 'not your motion' if user != self.receiver_user
    new_status = self.status
    if self.status == CURRENT
      type = Document::ResponseType.find(params[:category_id]) if params[:category_id].present?
      if type and type.category == Document::ResponseType::COMPLETE
        new_status = COMPLETED
      elsif type and type.category == Document::ResponseType::CANCEL
        new_status = CANCELED
      end
    end
    Document::Comment.transaction do
      # S1: create comment
      text = params[:text] if params[:text].present?
      Document::Comment.create!(document: self.document, motion: self, user: user,
        status: new_status, old_status: self.status, role: self.receiver_role,
        text: text)
      # S2: update motion
      if self.status != new_status # it's completed
        self.completed_at = Time.now
        self.status = new_status
      end
      self.response_type = type
      self.response_text = text
      self.save!
      # S3: calculate Document::User
      docuser = self.document.users.where(user: user).first
      docuser.calculate!
      # S4: mark other users unread
      docuser.make_others_unread!
      # S5: update upper motions
      check_level_ups!
    end
  end

  def check_level_ups!
    if self.status == CANCELED
      cancel_ups!
    elsif self.status == COMPLETED
      resend_ups!
    end
  end

  private

  def cancel_ups!
    ups = Document::Motion.where(parent_id: self.parent_id, status: SENT).where('ordering > ?', self.ordering)
    ups.each do |up|
      Document::User.upsert!(up.document, up.receiver_user, up.receiver_role, { status: NOT_RECEIVED })
      up.status = NOT_RECEIVED
      up.received_at = Time.now
      up.save!
    end
  end

  def resend_ups!
    ups = Document::Motion.where(parent_id: self.parent_id, status: SENT).where('ordering > ?', self.ordering)
    if ups.count > 0
      ordering = ups.minimum('ordering')
      ups = ups.where(ordering: ordering)
      ups.each do |up|
        Document::User.upsert!(up.document, up.receiver_user, up.receiver_role, { status: CURRENT })
        up.status = CURRENT
        up.received_at = Time.now
        up.save!
      end
    end
  end
end
