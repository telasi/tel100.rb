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

  def sync
    # TODO: this procedure fails to reconnect users with employees
    # HR::Employee.connection.execute('BEGIN TEMOCH.copy_to_docflow; COMMIT; END;')
    redirect_to return_url || admin_employees_url
  end

end
