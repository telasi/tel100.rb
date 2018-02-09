# -*- encoding : utf-8 -*-
class Document::History::File < ActiveRecord::Base
  self.table_name  = 'document_file_history'
  self.sequence_name = 'docfilehis_seq'
  belongs_to :document, class_name: 'Document::Base'

  def full_path
    #File.join(Rails.root, 'public', 'uploads', 'docfiles', self.store_name)
    if self.archived == 1
      repository = FILES_ARCHIVED_REPOSITORY
    else
      repository = FILES_REPOSITORY
    end
    File.join(repository, self.folder || '', self.store_name)
  end

  def delete_file
    FileUtils.rm(self.full_path)
  end
end
