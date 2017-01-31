# -*- encoding : utf-8 -*-
class Api::UtilsController < ApiController
  before_filter :validate_login

  def gettime
    render json: { success: true, time: Time.now }
  end

  def getdeadline
  	type = Document::Type.find(params[:type])
  	deadline = type.deadline if type
    render json: { success: true, deadline: Time.now + deadline.working.days }
  end
end
