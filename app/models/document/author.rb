# -*- encoding : utf-8 -*-
class Document::Author < ActiveRecord::Base
  include Document::Personalize
  self.table_name  = 'document_author'
  self.sequence_name = 'docauthors_seq'
  belongs_to :document, class_name: 'Document::Base'
  personalize 'author'
end
