# -*- encoding : utf-8 -*-
class Api::VacationController < ApiController
  before_filter :validate_login, except: 'types'

  def index
  end

  def create
    HR::Vacation::Base.create!(current_user, params)
    render json: { success: true }
  end

  def types
    @types = HR::Vacation::Type.order('id ASC')
    render formats: ['json']
  end

  def substitudes
    @substitudes = HR::Vacation::Base.users_i_substitude(current_user)
  end

  def list
    @list = HR::Vacation::Base.where(employee_id: current_user.employee.id)
  end
end
