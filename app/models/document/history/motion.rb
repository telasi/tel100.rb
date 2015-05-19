# -*- encoding : utf-8 -*-
class Document::History::Motion < ActiveRecord::Base
  self.table_name  = 'document_motion_history'
  self.sequence_name = 'docmotionhis_seq'
  self.set_integer_columns :status, :is_new

  belongs_to :document, class_name: 'Document::Base'
end
