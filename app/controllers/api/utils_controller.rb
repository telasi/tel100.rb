# -*- encoding : utf-8 -*-
class Api::UtilsController < ApiController
  before_filter :validate_login

  def gettime
    render json: { success: true, time: Time.now }
  end
end
