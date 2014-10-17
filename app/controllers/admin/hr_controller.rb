class Admin::HrController < AdminController
  def index
    @title = 'თანამშრომლები'
    @employees = HR::Employee.active.order('person_id').paginate(page: params[:page], per_page: 10)
  end

  def employee
    @employee = HR::Employee.find(params[:id])
    @title = @employee.full_name
  end
end