# -*- encoding : utf-8 -*-
class Document::Type < ActiveRecord::Base
  DEFAULT_MARGIN = 15 # mm
  MM_TO_INCHES = 0.039370

  self.table_name  = 'document_type'
  self.sequence_name = 'doctypes_seq'
  self.localized_fields('name')
  has_many :documents, class_name: 'Document::Base'
  validates :name_ka, presence: { message: 'ჩაწერეთ ქართული დასახელება' }

  def margins
    [ self.margin_top || DEFAULT_MARGIN,
      DEFAULT_MARGIN,
      self.margin_bottom || DEFAULT_MARGIN,
      DEFAULT_MARGIN
    ].map{|x| x * MM_TO_INCHES}
  end
end
