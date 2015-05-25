# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  include Document::Direction
  include Document::Status
  include Document::Role
  include Document::Who
  MIN = 1
  MAX = 999

  ORDERING_SINGEE  = 1
  ORDERING_ASIGNEE = 500
  ORDERING_AUTHOR  = 250

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
  belongs_to :actual_sender, class_name: 'Sys::User', foreign_key: 'actual_sender_id'
  belongs_to :last_receiver, class_name: 'Sys::User', foreign_key: 'last_receiver_id'
  personalize 'receiver'
  personalize 'sender'
  personalize 'owner'

  def new=(val); self.is_new = val ? 1 : 0 end
  def new?; self.is_new == 1 end
  def can_destroy?; self.new? end
  def draft?; self.status == DRAFT end
  def current?; self.status == CURRENT end
  def resolved?; self.status == COMPLETED || self.status == CANCELED end
  def can_edit?(user); self.sender_user == user end
  def sender_name; (self.sender_user || self.sender).to_s end
  def receiver_name;  (self.receiver_user || self.receiver).to_s end
  def current_status; self.response_type || self.send_type end

  def self.create_draft!(sender_user, params)
    document_id = params[:document_id] ; parent_id = params[:parent_id]
    document = Document::Base.find(document_id)
    parent = Document::Motion.find(parent_id) if parent_id.present?
    # check user permission for this action
    is_receiver_user = ( parent.present? and sender_user == parent.receiver_user )
    is_owner_user = ( parent.blank? and (sender_user == document.owner_user || sender_user == document.sender_user))
    raise I18n.t('models.document_motion.errors.no_privilege_to_add') unless (is_receiver_user or is_owner_user)
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
    # calculate is_new parameter
    is_new = 1
    if receiver_user
      docuser = Document::User.where(document_id: document_id, user_id: receiver_user.id).first
      is_new = docuser.is_new if docuser.present?
    end
    # create motion
    motion = Document::Motion.create!({ parent: parent, document: document, status: DRAFT,
      sender_user: sender_user, sender: sender, receiver_user: receiver_user,
      receiver: receiver, receiver_role: role, ordering: ordering, send_type: send_type,
      is_new: is_new, due_date: params[:due_date]
    })
    # first author is an owner of the document as well
    if role == ROLE_AUTHOR and document.owner_user == document.sender_user
      document.owner_user = receiver_user
      document.save!
    end
    # create document::user
    if receiver_user
      du = Document::User.where(document: document, user: receiver_user).first
      if du.blank?
        du = Document::User.create!(document: document, user: receiver_user, is_new: 1, is_changed: 1)
      end
      du.calculate!
    end

    return motion
  end

  # XXX: do we need this method any more?
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
    self.actual_sender = user
    self.status = self.receiver_user.blank? ? NOT_SENT : SENT
    if self.status == SENT
      # try to make this motion current
      lower = rel.where('ordering > 0 AND ordering < ? AND status IN (?)', self.ordering, [SENT,CURRENT,NOT_RECEIVED,CANCELED]).count
      if lower == 0
        self.status = CURRENT
        self.received_at = Time.now
      end
      # create new Document::User
      Document::User.upsert!(self.document, self.receiver_user, self.receiver_role, { status: self.status })
    end
    # save motion data
    self.save!
    # calculate related document users
    receiver_du = self.document.users.where(user: self.receiver_user).first
    sender_du = self.document.users.where(user: user).first
    receiver_du.calculate! if receiver_du.present?
    sender_du.calculate! if sender_du.present?
  end

  def add_comment(user, params, actual_user=nil)
    Document::Comment.transaction do
      self.add_comment!(user, params, actual_user)
    end
  end

  def add_comment!(user, params, actual_user=nil)
    raise 'status not supported' if [ DRAFT, SENT, NOT_SENT, NOT_RECEIVED ].include?(self.status)
    raise 'not your motion' if user != self.receiver_user
    new_status = self.status
    doc = self.document
    if self.status == CURRENT
      type = Document::ResponseType.find(params[:response_type_id]) if params[:response_type_id].present?
      if type.blank? and params[:response_type].present?
        type = Document::ResponseType.where(role: self.receiver_role, direction: params[:response_type]).order(:ordering).first
      end
      if type and type.positive?
        new_status = COMPLETED
      elsif type and type.negative?
        new_status = CANCELED
      end
    end
    # S1: create comment
    text = params[:text] if params[:text].present?
    Document::Comment.create!(document: doc, motion: self,
      user: user, actual_user: actual_user, role: self.receiver_role,
      status: new_status, old_status: self.status, text: text)
    # S2: update motion
    status_updated = false
    if self.status != new_status # it's completed
      self.completed_at = Time.now
      self.status = new_status
      status_updated = true
    end
    self.response_type = type
    self.response_text = text
    self.last_receiver = actual_user
    self.save!
    # S3: calculate Document::User
    docuser = doc.users.where(user: user).first
    docuser.calculate!
    # S4: mark other users unread
    docuser.make_others_unread!
    # S5: update upper motions
    check_level_ups!
    # S6: if motion was canceled mark others as not received
    is_signature = [ROLE_SIGNEE, ROLE_AUTHOR].include?(self.receiver_role)
    is_toplevel = self.parent_id.blank?
    if self.status == CANCELED and status_updated and is_signature and is_toplevel
      doc.motions.where('status IN (?)', [ SENT, CURRENT ]).each do |motion|
        motion.update_attributes!(status: NOT_RECEIVED)
        docuser = self.document.users.where(user: motion.receiver_user).first
        docuser.calculate!
      end
    end
  end

  def check_level_ups!
    if self.status == CANCELED
      cancel_ups!
    elsif self.status == COMPLETED
      resend_ups!
    end
  end

  def effective_due_date
    due = self.due_date || self.document.due_date
    if due.present? and self.received_at.present?
      if (due + 1.day) < self.received_at
        if self.document.due_date.present? and self.document.due_date > self.received_at
          return self.document.due_date
        end
      else
        return due
      end
    end
  end

  def due_date?; self.effective_due_date.present? end

  def due_is_over?
    due = self.effective_due_date
    return false if due.blank?
    completed = self.completed_at || Date.today
    completed > (due + 1.day)
  end

  # Motion is inner if all parties in this motion are inner parties.
  def inner?
    return true if inner_party?(self.receiver)
    return true if inner_party?(self.receiver_user)
    return false
  end

  def outer?
    not self.inner?
  end

  private

  def cancel_ups!
    ups = Document::Motion.where(parent_id: self.parent_id, status: SENT).where('ordering > ?', self.ordering)
    ups.each do |up|
      docuser = Document::User.upsert!(up.document, up.receiver_user, up.receiver_role, { status: NOT_RECEIVED })
      up.status = NOT_RECEIVED
      up.received_at = Time.now
      up.save!
      docuser.calculate!
    end
  end

  def resend_ups!
    thisLevel = Document::Motion.where(parent_id: self.parent_id, status: CURRENT, ordering: self.ordering).count
    if thisLevel == 0
      ups = Document::Motion.where(parent_id: self.parent_id).where('status IN (?) AND ordering > ?', [SENT, CURRENT], self.ordering)
      if ups.count > 0
        ordering = ups.minimum('ordering')
        ups = ups.where(ordering: ordering)
        ups.each do |up|
          docuser = Document::User.upsert!(up.document, up.receiver_user, up.receiver_role, { status: CURRENT })
          up.status = CURRENT
          up.received_at = Time.now
          up.save!
          docuser.calculate!
        end
      end
    end
  end
end
