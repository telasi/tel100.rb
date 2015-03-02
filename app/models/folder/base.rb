# -*- encoding : utf-8 -*-
class Folder::Base < ActiveRecord::Base
  self.table_name  = 'folder_base'
  self.sequence_name = 'folder_base_seq'

  has_many :documents, class_name: 'Folder::Document', foreign_key: 'folder_id'

  def delete_folder
  	Folder::Base.transaction do
  	  self.documents.destroy_all
      self.destroy
  	end
  end
end