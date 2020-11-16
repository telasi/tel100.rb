# -*- encoding : utf-8 -*-
class Document::History::Motion < Document::Motion
  # include Document::Personalize

  self.table_name  = 'document_motion_history'
  self.sequence_name = 'docmotionhis_seq'
  self.set_integer_columns :status, :is_new

  belongs_to :parent, class_name: 'Document::History::Motion'
end
