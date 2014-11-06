# -*- encoding : utf-8 -*-
class Document::Author < ActiveRecord::Base
  include Document::Personalize
  include Document::Signature
  self.table_name  = 'document_author'
  self.sequence_name = 'docauthors_seq'
  belongs_to :document, class_name: 'Document::Base'
  personalize 'author'
  before_create :on_before_create
  self.set_integer_columns :is_signed

  private

  def on_before_create
    self.sign_status = self.author_user_id.blank? ? SIGNED : NO_SIGNATURE
  end
end
