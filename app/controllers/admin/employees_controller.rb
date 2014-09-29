# -*- encoding : utf-8 -*-
class Admin::EmployeesController < AdminController

  def index
    @title = 'თანამშრომლები'
    @employees = active_employees.order(:person_id).paginate(page: params[:page], per_page: 10)
  end

  def show
    @employee = HR::Employee.find(params[:id])
    @title = @employee.full_name
  end

end
