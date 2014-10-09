# -*- encoding : utf-8 -*-
class Document::Text < ActiveRecord::Base
  self.table_name  = 'document_texts'
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
end
