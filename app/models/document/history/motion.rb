# -*- encoding : utf-8 -*-
class Document::History::Motion < ActiveRecord::Base
  include Document::Personalize

  self.table_name  = 'document_motion_history'
  self.sequence_name = 'docmotionhis_seq'
  self.set_integer_columns :status, :is_new

  belongs_to :document, class_name: 'Document::Base'
  belongs_to :response_type, class_name: 'Document::ResponseType', foreign_key: 'resp_type_id'
  belongs_to :send_type, class_name: 'Document::ResponseType', foreign_key: 'send_type_id'

  def current_status; self.response_type || self.send_type end

  personalize 'receiver'
  personalize 'sender'
  personalize 'owner'
end
