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
end
