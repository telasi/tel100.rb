# -*- encoding : utf-8 -*-
class Document::Motion < ActiveRecord::Base
  self.table_name  = 'documents_motion'
  self.sequence_name = 'docmotion_seq'
  belongs_to :document, class_name: 'Document::Base'
  belongs_to :parent, class_name: 'Document::Motion'
  belongs_to :sender_user, class_name: 'Sys::User'
  belongs_to :sender, polymorphic: true
  belongs_to :receiver_user, class_name: 'Sys::User'
  belongs_to :receiver, polymorphic: true
end
