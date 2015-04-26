# -*- encoding : utf-8 -*-
class Api::VacationController < ApiController
  before_filter :validate_login, except: 'types'

  def index
  end

  def create
    HR::Vacation::Vacation.create_document(current_user, params)
    render json: { success: true }
  end

  def types
    @types = HR::Vacation::Type.order('id ASC')
    render formats: ['json']
  end

  def substitudes
    @substitudes = HR::Vacation::Vacation.users_i_substitude(current_user)
  end

  def list
    @list = HR::Vacation::Vacation.where(userid: current_user)
  end
end
