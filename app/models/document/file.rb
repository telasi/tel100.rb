# -*- encoding : utf-8 -*-
class Document::File < ActiveRecord::Base
  self.table_name  = 'document_file'
  self.sequence_name = 'docfiles_seq'
  self.set_integer_columns :archived

  belongs_to :document, class_name: 'Document::Base'

  def size; File.size(self.full_path).size; end

  def self.upload(params)
    if params[:file].kind_of?(Array)
      params[:file].each do |file|
      f = create_file(file, params[:document_id])
      f.save!
    end
    else
      f = create_file(params[:file], params[:document_id])
      f.save!
    end
  end

  def self.replace(params)
    file = params[:file]
    f = Document::File.find(params[:id])
    FileUtils.cp(file.tempfile, f.full_path)
    f
  end

  def clone(doc)
    storename = (0..63).map{ |x| '0123456789abcdef'[rand(16)] }.join
    f = Document::File.new(document: doc, original_name: self.original_name, store_name: storename, created_at: Time.now)
    FileUtils.cp(self.full_path, f.full_path)
    f.save!
  end

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

  def self.create_file(file, document_id)
    document = Document::Base.find(document_id)
    storename = (0..63).map{ |x| '0123456789abcdef'[rand(16)] }.join
    f = Document::File.new(document: document, original_name: file.original_filename, store_name: storename, created_at: Time.now, folder: Time.now.strftime('%Y%m'))
    folder = File.join(FILES_REPOSITORY, Time.now.strftime('%Y%m'))
    FileUtils.mkdir_p(folder)
    FileUtils.cp(file.tempfile, f.full_path)
    f
  end

  def archive
    old_path = self.full_path
    self.archived = 1
    new_path = self.full_path
    archive_folder = File.join(FILES_ARCHIVED_REPOSITORY, self.folder || '')
    FileUtils.mkdir_p(archive_folder)
    FileUtils.move(old_path, new_path)
    save!
  rescue
  end

  def restore
    old_path = self.full_path
    self.archived = 0
    new_path = self.full_path
    archive_folder = File.join(FILES_REPOSITORY, self.folder || '')
    FileUtils.mkdir_p(archive_folder)
    FileUtils.move(old_path, new_path)
    save!
  rescue
  end
end
