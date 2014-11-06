# -*- encoding : utf-8 -*-
class Api::HrController < ApiController
  include TreeUtils
  before_filter :validate_login

  def structure
    employees = HR::Employee.active.index_by{ |node| node['organization_id'] }
    structureArray = HR::Organization.active.order(saporg_type: :desc).order(is_manager: :desc, priority: :asc).map do |org|
      if org.saporg_type == 'S'
        empl = employees[org.id]
        { id: empl.id, parent_id: org.parent_id, type: 'HR::Employee', name: empl.full_name, image: empl.icon, organization: org.name, is_manager: org.is_manager } if empl
      else
        { id: org.id, parent_id: org.parent_id, type: 'HR::Organization', name: org.name, image: org.icon }
      end
    end.select{ |x| x.present? }
    render json: array_to_tree(structureArray)
  end
end
