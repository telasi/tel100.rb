# -*- encoding : utf-8 -*-
class Document::Author < ActiveRecord::Base
  self.table_name  = 'document_author'
  self.sequence_name = 'docauthors_seq'
  belongs_to :document, class_name: 'Document::Base'
  belongs_to :author_user, class_name: 'Sys::User'
  belongs_to :author, polymorphic: true
end
