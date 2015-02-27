# -*- encoding : utf-8 -*-
class Api::Documents::FilesController < ApiController
  before_filter :validate_login

  def index
    @files = Document::File.where(document_id: params[:document_id])
  end

  def upload
    render json: { success: Document::File.upload(params) }
  end

  def delete
    file = Document::File.find(params[:id])
    file.delete_file
    file.destroy
  end
end
