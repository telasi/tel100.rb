# -*- encoding : utf-8 -*-
class Api::UtilsController < ApiController
  before_filter :validate_login

  def gettime
    render json: { success: true, time: Time.now }
  end

  def getdeadline
  	if params[:subtype].present? && params[:type].to_i == GNERC_TYPE4
  		record = Document::GnercSubtype.find(params[:subtype])
    else
    	record = Document::Type.find(params[:type])
	  end
	  deadline = record.deadline if record
    if deadline == 0
      render json: { success: true, deadline: nil }
    else 
      render json: { success: true, deadline: Time.now + deadline.working.days }
    end
  end
end
