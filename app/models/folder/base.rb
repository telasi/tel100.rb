# -*- encoding : utf-8 -*-
class Folder::Base < ActiveRecord::Base
  self.table_name  = 'folder_base'
  self.sequence_name = 'folder_base_seq'
  self.set_integer_columns :folder_type

  has_many :documents, class_name: 'Folder::Document', foreign_key: 'folder_id'

  def to_hash(user)
    {
      id:        self.id,
      name:      self.name,
      count:     Folder::Base.where(id: self.id).joins(:documents).count,
      folder_type: self.folder_type,
      form: self.form
    }
  end

  def delete_folder
  	Folder::Base.transaction do
  	  self.documents.destroy_all
      self.destroy
  	end
  end
end