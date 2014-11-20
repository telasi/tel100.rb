# -*- encoding : utf-8 -*-
class Document::Comment < ActiveRecord::Base
  include Document::Role
  include Document::Status
  self.table_name  = 'document_comment'
  self.sequence_name = 'doccomment_seq'
  self.set_integer_columns :status, :old_status
  belongs_to :document, class_name: 'Document::Base'
  belongs_to :user, class_name: 'Sys::Base'
end
