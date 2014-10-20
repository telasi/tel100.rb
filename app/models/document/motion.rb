# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  self.table_name  = 'document_motion'
  self.sequence_name = 'docmotion_seq'
  self.set_integer_columns :sender_is_read, :receiver_is_read
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :parent, class_name: 'Document::Motion'
  belongs_to :sender_user, class_name: 'Sys::User'
  belongs_to :sender, polymorphic: true
  belongs_to :receiver_user, class_name: 'Sys::User'
  belongs_to :receiver, polymorphic: true

  def sender_read?; self.sender_is_read == 1 end
  def receiver_read?; self.receiver_is_read == 1 end
end
