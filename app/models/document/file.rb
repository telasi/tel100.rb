# -*- encoding : utf-8 -*-
class Document::File < ActiveRecord::Base
  self.table_name  = 'document_file'
  self.sequence_name = 'docfiles_seq'
  belongs_to :document, class_name: 'Document::Base'
end
