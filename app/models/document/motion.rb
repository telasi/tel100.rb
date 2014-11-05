# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  include Document::Personalize
  self.table_name  = 'document_motion'
  self.sequence_name = 'docmotion_seq'
  self.set_integer_columns :sender_is_read, :receiver_is_read
  belongs_to :document, class_name: 'Document::Base'
  belongs_to :parent, class_name: 'Document::Motion'
  personalize 'receiver'
  personalize 'sender'

  def sender_read?; self.sender_is_read == 1 end
  def receiver_read?; self.receiver_is_read == 1 end

  def to_jbuilder
    Jbuilder.new do |json|
      json.(self, :id, :parent_id, :status, :motion_text, :response_text, :sender_is_read, :receiver_is_read)
      if self.sender_user
        json.set! :sender_full_name, self.sender_user.full_name
      end
      json.set! :receiver_full_name, self.receiver.ext_name
    end
  end

  def as_json
    to_jbuilder.attributes!
  end
end
