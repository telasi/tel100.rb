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
end
