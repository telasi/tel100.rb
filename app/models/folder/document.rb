# -*- encoding : utf-8 -*-
class Folder::Document < ActiveRecord::Base
  self.table_name  = 'folder_documents'
  belongs_to :document_user, class_name: 'Document::User', primary_key: 'document_id', foreign_key: 'doc_id'
  belongs_to :folder, class_name: 'Folder::Base', foreign_key: 'folder_id'

  def self.docs(folder)
  	Folder::Document.where('folder_id = ?', folder).map do |doc|
  		doc.document_user
  	end
  end
end