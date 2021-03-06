# -*- encoding : utf-8 -*-
class Document::Type < ActiveRecord::Base
  include Document::Direction

  DEFAULT_MARGIN = 15 # mm
  MM_TO_INCHES = 0.039370 # mm -> inches coefficient

  self.table_name  = 'document_type'
  self.sequence_name = 'doctypes_seq'
  self.localized_fields('name')
  self.set_integer_columns :print_header
  self.set_integer_columns :is_special
  self.set_integer_columns :is_gnerc, :deadline
  self.set_integer_columns :allow_inner, :allow_in, :allow_out

  has_many :documents, class_name: 'Document::Base'
  validates :name_ka, presence: { message: 'ჩაწერეთ ქართული დასახელება' }

  def print_header?; self.print_header == 1 end
  def special?; self.is_special == 1 end
  def gnerc?; self.is_gnerc == 1 end
  def inner?; self.allow_inner == 1 end
  def out?; self.allow_out == 1 end
  def in?; self.allow_in == 1 end

  def margins(direction=IN)
    if direction == OUT and self.margin_top_out
      top_margin = self.margin_top_out
    else
      top_margin = ( self.margin_top || DEFAULT_MARGIN )
    end

    [ top_margin,
      DEFAULT_MARGIN,
      self.margin_bottom || DEFAULT_MARGIN,
      DEFAULT_MARGIN
    ].map{|x| x * MM_TO_INCHES}
  end

  def self.default_margins
    [ DEFAULT_MARGIN,
      DEFAULT_MARGIN,
      DEFAULT_MARGIN,
      DEFAULT_MARGIN
    ].map{|x| x * MM_TO_INCHES}
  end
end
