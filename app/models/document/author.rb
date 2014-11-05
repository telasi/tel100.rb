# -*- encoding : utf-8 -*-
class Document::Author < ActiveRecord::Base
  include Document::Personalize
  self.table_name  = 'document_author'
  self.sequence_name = 'docauthors_seq'
  belongs_to :document, class_name: 'Document::Base'
  personalize 'author'
  before_create :on_before_create
  self.set_integer_columns :is_signed

  def signed?; self.is_signed == 1 end

  private

  def on_before_create
    self.is_signed = self.author_user_id.blank? ? 1 : 0
  end
end
