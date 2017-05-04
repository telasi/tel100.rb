# -*- encoding : utf-8 -*-
class Document::Gnerc < ActiveRecord::Base
  self.table_name  = 'document_gnerc'
  self.set_integer_columns :status, :mediate

  belongs_to :document, class_name: 'Document::Base'
  belongs_to :file, class_name: 'Document::File'

  def self.upload(params)
    f = Document::File.create_file(params)
    f.save!

    document = Document::Base.find(params[:document_id])

    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document)
    gnerc.file = f
    gnerc.created_at = Time.now
    gnerc.save!
  end

  def full_path
    #File.join(Rails.root, 'public', 'uploads', 'docfiles', self.store_name)
    File.join(FILES_REPOSITORY, self.store_name)
  end

  def delete_file
    FileUtils.rm(self.full_path)
  end

  def self.update_gnerc(params)
    document = Document::Base.find(params[:id])
    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document, status: 1)
    gnerc.update_attributes!(params.permit(:type_id, :status, :mediate))
    gnerc.save!
  end

  def self.send_sms(params)
    document = Document::Base.find(params[:id])
    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document)
  end
end
