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
    document = Document::Base.find(params[:document_id])
    parent = Document::Motion.find(params[:parent_id]) if params[:parent_id]

    sender = whose_user(sender_user)
    receiver_user, receiver = who_eval('receiver', params)

    same_receiver_user = receiver_user.present? and sender_user == receiver_user
    same_receiver = receiver.present? and sender.present? and sender == receiver
    raise 'sender should not send to himself' if same_receiver or same_receiver_user

    # TODO: check permission
    # TODO: check existence of this receiver on the branch

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
