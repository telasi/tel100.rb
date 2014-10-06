# -*- encoding : utf-8 -*-
class DocumentMotion < ActiveRecord::Base
  self.table_name  = 'documents_motion'
  self.sequence_name = 'docmotion_seq'
  belongs_to :document
  belongs_to :parent, class_name: 'DocumentMotion'
  belongs_to :sender_user, class_name: 'Sys::User'
  belongs_to :sender, polymorphic: true
  belongs_to :receiver_user, class_name: 'Sys::User'
  belongs_to :receiver, polymorphic: true
end
