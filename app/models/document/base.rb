# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Status

  self.table_name  = 'documents'
  self.sequence_name = 'documents_seq'
  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  belongs_to :author_user, class_name: 'Sys::User', foreign_key: 'author_user_id'
  belongs_to :author, polymorphic: true
  belongs_to :sender_user, class_name: 'Sys::User', foreign_key: 'sender_user_id'
  belongs_to :sender, polymorphic: true
  belongs_to :owner_user, class_name: 'Sys::User', foreign_key: 'owner_user_id'
  belongs_to :owner,  polymorphic: true

  def self.new_document(opts = {})
    status = status_eval(opts) # TODO: check status
    
  end
end
