# -*- encoding : utf-8 -*-
class Api::HrController < ApiController
  include TreeUtils
  before_filter :validate_login

  def structure
    employees = HR::Employee.active.index_by{ |node| node['organization_id'] }
    structureArray = HR::Organization.active.order(saporg_type: :desc).order(is_manager: :desc, priority: :asc).map do |org|
      if org.saporg_type == 'S'
        empl = employees[org.id]
        empl.to_hash(organization: org) if empl
      else
        org.to_hash
      end
    end.select{ |x| x.present? }
    render json: array_to_tree(structureArray)
  end

  def party
    render json: HR::Party.all
  end
end
