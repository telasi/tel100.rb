# -*- encoding : utf-8 -*-
class Document::SendOrdering < ActiveRecord::Base
  self.table_name  = 'DOCUMENT_SEND_ORDERINGS'
  self.primary_key [:role, :user_id, :type_id]
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
end
