# -*- encoding : utf-8 -*-
class Admin::EmployeesController < AdminController

  def index
    @title = 'თანამშრომლები'
    @employees = HR::Employee.active.order(:person_id).paginate(page: params[:page], per_page: 10)
  end

  def show
    @employee = HR::Employee.find(params[:id])
    @title = @employee.full_name
  end

  def info
    employee = HR::Employee.active.where(person_id: params[:person_id].to_i).first
    render json: employee ? {
      employee_id: employee.id,
      person_number: employee.person_number,
      first_name: employee.first_name,
      last_name: employee.last_name
    } : {
      error: 'თანამშრომელი ვერ მოიძებნა'
    }
  end

end
