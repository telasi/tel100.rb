# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  include Document::Status
  include Document::Role
  include Document::Who
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

  def new=(val); self.is_new = val ? 1 : 0 end
  def new?; self.is_new == 1 end
  def can_destroy?; self.new? end

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
      ordering: MAX,
      sender_user: sender_user,
      sender: sender,
      receiver_user: receiver_user,
      receiver: receiver,
      is_new: true
    })
  end
end
