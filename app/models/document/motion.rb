# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  MAX = 999
  ROLE_AUTHOR   = 'author'
  ROLE_ASSIGNEE = 'assignee'
  ROLE_SIGNEE   = 'signee'
  include Document::Personalize
  include Document::Status
  self.table_name  = 'document_motion'
  self.sequence_name = 'docmotion_seq'
  belongs_to :document, class_name: 'Document::Base'
  belongs_to :parent, class_name: 'Document::Motion'
  personalize 'receiver'
  personalize 'sender'
end
