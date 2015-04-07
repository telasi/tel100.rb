# -*- encoding : utf-8 -*-
class Document::ResponseType < ActiveRecord::Base
  SEND     = 'snd'
  COMPLETE = 'pos'
  CANCEL   = 'neg'

  self.table_name  = 'DOCUMENT_RESPONSE_TYPES'
  self.sequence_name = 'DOCRESPTYPE_SEQ'
  self.localized_fields('name')

  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
end
