# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  include Document::Role
  MAX = 999

  include Document::Personalize
  include Document::Status
  self.table_name  = 'document_motion'
  self.sequence_name = 'docmotion_seq'
  self.set_integer_columns :status, :is_new

  belongs_to :document, class_name: 'Document::Base'
  belongs_to :parent, class_name: 'Document::Motion'
  personalize 'receiver'
  personalize 'sender'

  def new=(val); self.is_new = val ? 1 : 0 end
  def new?; self.is_new == 1 end
  def can_destroy?; self.new? end
end
