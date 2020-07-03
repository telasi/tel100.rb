# -*- encoding : utf-8 -*-
class Api::UtilsController < ApiController
  before_filter :validate_login

  def gettime
    render json: { success: true, time: Time.now }
  end

  def getdeadline
  	if params[:subtype].present?
  		record = Document::GnercSubtype.find(params[:subtype])
    else
    	record = Document::Type.find(params[:type])
	end
	deadline = record.deadline if record
    render json: { success: true, deadline: Time.now + deadline.working.days }
  end
end
