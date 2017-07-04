class Sys::UploadFile < ActiveRecord::Base
  self.table_name  = 'upload_file'

  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
end