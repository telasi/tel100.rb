# -*- encoding : utf-8 -*-
class Document::FileTemp < ActiveRecord::Base
  self.table_name  = 'document_file_temp'
  self.sequence_name = 'docfilestemp_seq'
  self.set_integer_columns :state, :archived

  belongs_to :document, class_name: 'Document::Base'

  def self.upload(params)
    document = Document::Base.find(params[:document_id])
    storename = (0..63).map{ |x| '0123456789abcdef'[rand(16)] }.join
    f = Document::FileTemp.new(document: document, original_name: params[:file].original_filename, store_name: storename, state: Document::Change::STATE_TEMP, created_at: Time.now)
    #dir = File.join(Rails.root, 'public', 'uploads', 'docfiles')
    # file = File.join(dir, storename)
    FileUtils.mkdir_p(FILES_TEMP_REPOSITORY)
    FileUtils.cp(params[:file].tempfile, f.full_path)
    f.save!
  end

  def full_path
    #File.join(Rails.root, 'public', 'uploads', 'docfiles', self.store_name)
    File.join(FILES_TEMP_REPOSITORY, self.store_name)
  end

  def delete_file
    FileUtils.rm(self.full_path)
  end
end
