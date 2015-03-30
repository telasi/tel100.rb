# -*- encoding : utf-8 -*-
class Document::ResponseType < ActiveRecord::Base
  TYPEKEY_SEND = 1
  TYPEKEY_RESP = 2

  self.table_name  = 'DOCUMENT_RESPONSE_TYPES'
  self.sequence_name = 'DOCRESPTYPE_SEQ'
  self.set_integer_columns :typekey
  self.localized_fields('name')
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :motion, class_name: 'Document::Motion', foreign_key: 'motion_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def self.send_types
    self.where(typekey: TYPEKEY_SEND)
  end

  def self.response_types
    self.where(typekey: TYPEKEY_RESP)
  end
end
