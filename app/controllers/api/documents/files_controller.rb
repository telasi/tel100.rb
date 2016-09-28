# -*- encoding : utf-8 -*-
class Api::Documents::FilesController < ApiController
  before_filter :validate_login, except: 'download'

  def index
    @files = Document::File.where(document_id: params[:document_id]).order(:id)
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

  def indextemp
    @files = Document::FileTemp.where(document_id: params[:document_id]).order(:id)
  end

  def uploadtemp
    render json: { success: Document::FileTemp.upload(params) }
  end

  def destroytemp
    file = Document::FileTemp.find(params[:id])
    if file.state == Document::Change::STATE_TEMP
      file.delete_file
      file.destroy
    else
      file.state = Document::Change::STATE_DELETED
      file.save
    end
    render json: { success: true }
  end

  def downloadtemp
    file = Document::FileTemp.find(params[:id])
    send_file file.full_path, filename: file.original_name, disposition: 'inline'
  end

  def prepare
    Document::FileTemp.where(document_id: params[:id]).map do |f|
      f.delete_file if f.state == Document::Change::STATE_TEMP
      f.destroy
    end
    Document::File.where(document_id: params[:id]).map do |f| 
      nf = Document::FileTemp.new(document_id: f.document_id, original_name: f.original_name, store_name: f.store_name,
                                  state: Document::Change::STATE_CURRENT, created_at: f.created_at)
      nf.save
    end
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
end
