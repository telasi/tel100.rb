# -*- encoding : utf-8 -*-
class Folder::Document < ActiveRecord::Base
  self.table_name  = 'folder_documents'
  belongs_to :document_user, class_name: 'Document::User', primary_key: 'document_id', foreign_key: 'doc_id'
  belongs_to :folder, class_name: 'Folder::Base', foreign_key: 'folder_id'

  def self.docs(folder, user)
  	Document::User.joins("JOIN folder_documents ON folder_documents.doc_id = document_user.document_id 
  		                  and document_user.user_id = #{user.id}
  						  and folder_documents.folder_id = #{folder}")
  end
end