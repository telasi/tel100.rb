# -*- encoding : utf-8 -*-
class Document::Templates < ActiveRecord::Base
  self.table_name  = 'document_templates'
  self.sequence_name = 'doc_templates_seq'

  belongs_to :user, class_name: 'Document::User', foreign_key: 'user_id'
end
