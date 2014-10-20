class Document::Type < ActiveRecord::Base
  self.table_name  = 'document_type'
  self.localized_fields('name')
  has_many :documents, class_name: 'Document::Base'
end