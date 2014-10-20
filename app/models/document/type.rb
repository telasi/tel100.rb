class Document::Type
  self.table_name  = 'doc_types'
  has_many :documents, class_name: 'Document::Base'
end