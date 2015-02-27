# -*- encoding : utf-8 -*-
class Document::File < ActiveRecord::Base
  self.table_name  = 'document_file'
  self.sequence_name = 'docfiles_seq'
  belongs_to :document, class_name: 'Document::Base'

  def self.upload(params)
    document = Document::Base.find(params[:document_id])
    storename = (0..63).map{ |x| '0123456789abcdef'[rand(16)] }.join
    f = Document::File.new(document: document, original_name: params[:file].original_filename, store_name: storename, created_at: Time.now)
    dir = File.join(Rails.root, 'public', 'uploads', 'docfiles')
    file = File.join(dir, storename)
    FileUtils.mkdir_p(dir)
    FileUtils.cp(params[:file].tempfile, file)
    f.save!
  end

  def delete_file
    FileUtils.rm(File.join(Rails.root, 'public', 'uploads', 'docfiles', self.store_name))
  end
end
