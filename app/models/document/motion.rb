# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  include Document::Status
  include Document::Role
  include Document::Who
  MIN = 1
  MAX = 999

  include Document::Personalize
  include Document::Status
  self.table_name  = 'document_motion'
  self.sequence_name = 'docmotion_seq'
  self.set_integer_columns :status, :is_new

  belongs_to :document, class_name: 'Document::Base'
  belongs_to :parent, class_name: 'Document::Motion'
  personalize 'receiver'
  personalize 'sender'
  personalize 'owner'

  def new=(val); self.is_new = val ? 1 : 0 end
  def new?; self.is_new == 1 end
  def can_destroy?; self.new? end
  def draft?; self.status == DRAFT end
  def can_edit?(user); self.sender_user == user end

  def self.create_draft!(sender_user, params)
    document_id = params[:document_id] ; parent_id = params[:parent_id]
    document = Document::Base.find(document_id)
    parent = Document::Motion.find(parent_id) if parent_id.present?
    # check user permission for this action
    is_receiver_user = ( parent.present? and sender_user == parent.receiver_user )
    is_owner_user = ( parent.blank? and sender_user == document.owner_user )
    raise "#{sender_user.username} doesn't have permission for this action" unless is_receiver_user or is_owner_user
    # sender/receiver information
    sender = whose_user(sender_user)
    receiver_user, receiver = who_eval('receiver', params)
    same_receiver_user = ( receiver_user.present? and sender_user == receiver_user )
    same_receiver = ( receiver.present? and sender.present? and sender == receiver )
    raise 'sender should not send to himself' if same_receiver or same_receiver_user
    # check existence of this receiver on the branch
    receiver_count = receiver.present? ? document.motions.where(parent_id: parent_id, receiver: receiver).count : 0
    receiver_user_count = receiver_user.present? ? document.motions.where(parent_id: parent_id, receiver_user: receiver_user).count : 0
    raise 'this receiver is already on this branch' if ( receiver_count > 0 or receiver_user_count > 0 )
    # create this
    Document::Motion.create!({
      parent: parent,
      document: document,
      status: DRAFT,
      ordering: MIN,
      sender_user: sender_user,
      sender: sender,
      receiver_user: receiver_user,
      receiver: receiver,
      is_new: true
    })
  end

  def update_draft!(user, params)
    raise 'not a draft' unless self.draft?
    raise 'don\'t have edit permission' unless self.can_edit?(user)
    Document::Motion.transaction do
      self.update_attributes(params.permit(:ordering, :due_date, :motion_text, :receiver_role))
      self.save!
    end
  end

  def delete_draft!(user)
    raise 'not a draft' unless self.draft?
    raise 'don\'t have delete permission' unless self.can_edit?(user)
    self.destroy
  end

  def send_draft!(user)
    raise 'not a draft' unless self.draft?
    # raise 'don\'t have send permission' unless self.can_edit?(user)
    rel = Document::Motion.where(document: self.document, parent: self.parent)
    # checking if there are some motions above this motion
    upper = rel.where('ordering > ? AND status NOT IN (?)', self.ordering, [DRAFT]).count
    raise 'not possible to send from this level' if upper > 0
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

      # setting Document::User
      Document::User.upsert!(self.document, self.receiver_user, self.receiver_role, { status: self.status })
    end
    # save motion data
    self.save!
  end
end
