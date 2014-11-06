# -*- encoding : utf-8 -*-
class Admin::HrController < AdminController
  include Utils

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
    @employees = HR::Employee.where(organization: @organization)
    @title = @organization.present? ? @organization.name : 'სს თელასი'
  end

  def structure
    employees = HR::Employee.active.index_by{ |node| node['organization_id'] }
    structureArray = HR::Organization.active.order(saporg_type: :desc).order(is_manager: :desc, priority: :asc).map do |org|
      if org.saporg_type == 'S'
        empl = employees[org.id]
        { id: org.id, type: 'HR::Employee', parent_id: org.parent_id, title: empl.full_name, icon: empl.icon, organization: org.name } if empl
      else
        { id: org.id, type: 'HR::Organization', parent_id: org.parent_id, title: org.name, icon: org.icon }
      end
    end.select{ |x| x.present? }
    render json: array_to_tree(structureArray)
  end
end
