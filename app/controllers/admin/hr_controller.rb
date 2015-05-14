# -*- encoding : utf-8 -*-
class Admin::HrController < AdminController
  def employees
    @title = 'თანამშრომლები'
    @employees = HR::Employee.active.order('person_id')
  end

  def employee
    @employee = HR::Employee.find(params[:id])
    @title = @employee.full_name
  end

  def organization
    @organization = HR::Organization.find(params[:parent_id]) if params[:parent_id].present?
    @children = HR::Organization.where(parent: @organization)
    @employees = HR::Employee.where(organization: @organization, is_active: 1)
    @title = @organization.present? ? @organization.name : 'სს თელასი'
  end
end
