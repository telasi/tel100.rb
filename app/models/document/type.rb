# -*- encoding : utf-8 -*-
class Document::Type < ActiveRecord::Base
  self.table_name  = 'document_type'
  self.sequence_name = 'doctypes_seq'
  self.localized_fields('name')
  has_many :documents, class_name: 'Document::Base'
  validates :name_ka, presence: { message: 'ჩაწერეთ ქართული დასახელება' }
end
