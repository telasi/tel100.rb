# -*- encoding : utf-8 -*-
class Api::Documents::FilesController < ApiController
  before_filter :validate_login

  def index
    @files = Document::File.where(document_id: params[:document_id])
  end

  def upload
    render json: { success: Document::File.upload(params) }
  end
end
