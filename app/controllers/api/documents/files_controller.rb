# -*- encoding : utf-8 -*-
class Api::Documents::FilesController < ApiController
  before_filter :validate_login

  def upload
    render json: { success: Document::File.upload(params) }
  end
end
