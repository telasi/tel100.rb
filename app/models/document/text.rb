# -*- encoding : utf-8 -*-
class Document::Text < ActiveRecord::Base
  self.table_name  = 'document_text'
  belongs_to :document, class_name: 'Document::Base'
end
