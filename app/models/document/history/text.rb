# -*- encoding : utf-8 -*-
class Document::History::Text < ActiveRecord::Base
  self.table_name  = 'document_text_history'
  self.sequence_name = 'doctexthis_seq'
  belongs_to :document, class_name: 'Document::Base'
end
