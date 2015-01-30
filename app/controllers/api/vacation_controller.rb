# -*- encoding : utf-8 -*-
class Api::VacationController < ApiController
  before_filter :validate_login, except: 'types'

  def index
  end

  def create
    @vac = HR::Vacation::Vacation.new(params.require(:vacation).permit(:vacation_type, :from_date, :to_date, :substitude))
    @vac.userid = current_user.id
    if @vac.save!
     render json: { success: true } 
    else
     render json: { success: false, message: @vac.errors.full_messages }
    end
  end

  def types
    @types = HR::Vacation::Type.order('id ASC')
    render formats: ['json']
  end
end
