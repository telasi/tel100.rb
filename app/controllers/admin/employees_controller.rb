# -*- encoding : utf-8 -*-
class Admin::EmployeesController < AdminController

  def index
    @title = 'თანამშრომლები'
    @employees = active_employees
  end

end
