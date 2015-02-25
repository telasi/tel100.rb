# -*- encoding : utf-8 -*-
class Api::Documents::FilesController < ApiController
  before_filter :validate_login

  def upload
    # TODO: fileupload
    debugger
    render json: { success: true }
  end
end
