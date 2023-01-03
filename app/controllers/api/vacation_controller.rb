# -*- encoding : utf-8 -*-
class Api::VacationController < ApiController
  before_filter :validate_login, except: 'types'

  def index
  end

  def create
    if HR::Vacation::Base.create!(current_user, params)
      render json: { success: true }
    else 
      render json: { success: false }
    end
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

  def defaults
    if request.post?
      HR::Vacation::Defaults.populate(params, current_user)
      render json: { success: true }
    else
      render json: HR::Vacation::Defaults.where(user: current_user).as_json(methods: :person_name)
      # .as_json(include: [methods: :person_name])
    end
  end
end
