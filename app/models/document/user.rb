# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  self.table_name  = 'document_user'
  self.set_integer_columns :is_read, :status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Document::User', foreign_key: 'user_id'

  def read?; self.is_read == 1 end
end
