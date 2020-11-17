# -*- encoding : utf-8 -*-
class Api::Documents::FilesController < ApiController
  before_filter :validate_login, except: ['download', 'download_history']

  def index
    @files = file_source.where(document_id: params[:document_id]).order(:id)
  end

  def upload
    render json: { success: Document::File.upload(params) }
  end

  def destroy
    file = Document::File.find(params[:id])
    file.delete_file
    file.destroy
    render json: { success: true }
  end

  def download
    file = Document::File.find(params[:id])
    send_file file.full_path, filename: file.original_name, disposition: 'inline'
  end

  def download_history
    file = Document::History::File.find(params[:id])
    send_file file.full_path, filename: file.original_name, disposition: 'inline'
  end

  def indextemp
    @files = Document::FileTemp.where(document_id: params[:document_id]).order(:id)
  end

  def uploadtemp
    render json: { success: Document::FileTemp.upload(params) }
  end

  def destroytemp
    file = Document::FileTemp.find(params[:id])
    # if file.state == Document::Change::STATE_TEMP
      file.delete_file
      file.destroy
    # else
    #   file.state = Document::Change::STATE_DELETED
    #   file.save
    # end
    render json: { success: true }
  end

  def downloadtemp
    file = Document::FileTemp.find(params[:id])
    send_file file.full_path, filename: file.original_name, disposition: 'inline'
  end

  def prepare
    doc = Document::Base.find(params[:id])

    Document::FileTemp.where(document_id: params[:id]).map do |f|
      f.delete_file #if f.state == Document::Change::STATE_TEMP
      f.destroy
    end
    # Document::File.where(document_id: params[:id]).map do |f| 
    #   next if doc.gnerc.present? && (doc.gnerc.file_id == f.id) # dont show if gnerc file

    #   nf = Document::FileTemp.new(document_id: f.document_id, original_name: f.original_name, store_name: f.store_name,
    #                               state: Document::Change::STATE_CURRENT, created_at: f.created_at)
    #   FileUtils.mkdir_p(FILES_TEMP_REPOSITORY)
    #   FileUtils.cp(f.full_path, nf.full_path)
    #   nf.save
    # end
    render json: { success: true }
  end

  def purge
    Document::FileTemp.where(document_id: params[:id]).map do |f|
      f.delete_file if f.state == Document::Change::STATE_TEMP
      f.destroy
    end
    render json: { success: true }
  end

  def uploadgnerc
    render json: { success: Document::Gnerc.upload(params) }
  end

  private 

  def file_source
    params[:change_no].present? ? Document::History::File.where(change_no: params[:change_no]) : Document::File
  end
end
