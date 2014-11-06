# -*- encoding : utf-8 -*-
class Admin::HrController < AdminController
  include TreeUtils

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
        { id: empl.id, type: 'HR::Employee', parent_id: org.parent_id, name: empl.full_name, image: empl.icon, organization: org.name, is_manager: org.is_manager } if empl
      else
        { id: org.id, type: 'HR::Organization', parent_id: org.parent_id, name: org.name, image: org.icon }
      end
    end.select{ |x| x.present? }
    render json: array_to_tree(structureArray)
  end
end
