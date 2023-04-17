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
      defaults = HR::Vacation::Defaults.where(user: current_user).as_json(methods: :person_name)
      # assignees = []
      # HR_ASSIGNEES.each do |assignee|
      #   employee = HR::Employee.find(assignee)
      #   assignees << {
      #        id: assignee,
      #   #     person_name: employee.to_s
      #   }
      # end
      # defaults << { key: 'assignees', value: assignees }
      defaults << 
      { 
        id: -1,
        key: 'onbehalf',
        person_name: current_user.to_s,
        user_id: current_user.id,
        value: current_user.employee.id
      }
      render json: defaults
      # .as_json(include: [methods: :person_name])
    end
  end
end
