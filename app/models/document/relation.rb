# -*- encoding : utf-8 -*-
class Document::Relation < ActiveRecord::Base
  self.table_name  = 'document_relation'
  self.sequence_name = 'docrel_seq'
  belongs_to :base, class_name: 'Document::Base'
  belongs_to :related, polymorphic: true
end
