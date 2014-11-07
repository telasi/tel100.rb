# -*- encoding : utf-8 -*-
class Document::Signature < ActiveRecord::Base
  include Document::Personalize
  include Document::Sign
  self.table_name  = 'document_signature'
  self.sequence_name = 'docsigns_seq'
  belongs_to :document, class_name: 'Document::Base'
  personalize 'signature'
  before_create :on_before_create

  private

  def on_before_create
    self.sign_status = NO_SIGNATURE
  end
end
