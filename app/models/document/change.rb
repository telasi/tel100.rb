# -*- encoding : utf-8 -*-
class Document::Change < ActiveRecord::Base
  STATE_CURRENT = 0
  STATE_DELETED = 1
  STATE_TEMP    = 2

  self.table_name  = 'document_change'
  self.sequence_name = 'docchange_seq'

  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  has_many :files, class_name: 'Document::File', foreign_key: 'change_no'
  has_many :texts, class_name: 'Document::Text', foreign_key: 'change_no'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
end
