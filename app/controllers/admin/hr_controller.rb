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
    @structure = HR::Organization.where(is_active: 1).order(saporg_type: :desc).order(is_manager: :desc).order(priority: :asc)
    @employees = HR::Employee.where(is_active: 1)

    structureArray = @structure.as_json(except: [:created_at, :updated_at])
    # employeeArray  = @employees.as_json(only: [ "first_name_#{I18n.locale}", "last_name_#{I18n.locale}", :id, :organization_id, :is_manager])
    employee_hash = employees.index_by{|node| node["organization_id"]}

    structureArray.each do |item|
      item.store('key', "#{item['id']}")
      item.store('title', item.delete("name_#{I18n.locale}") )
      item.store('icon', "images/tree/HRtreeicon#{item['saporg_type']}#{'M' if item['is_manager']}.png")
      item.store('type', 'O')
      item.store('leaf', true)

      employee = employee_hash[item['id']]
      if employee 
        item.store('key', "P#{employee[:id]}")
        item.store('title', employee["first_name_#{I18n.locale}"] + " " + employee["last_name_#{I18n.locale}"] + " (" + item['title'] + ")")
        item.store('icon', "images/tree/HRtreeiconP.png")
        item.store('type', 'P')
        item.store('leaf', true)
      end
    end

    # employeeArray.each do |item|
    #   item.store('key', "P#{item.delete('id')}")
    #   item.store('id', item['key'])
    #   # item.store('parent_id', item.delete('organization_id'))
    #   item.store('title', item.delete("first_name_#{I18n.locale}") + " " + item.delete("last_name_#{I18n.locale}"))
    #   item.store('icon', "images/tree/HRtreeiconP.png")
    #   item.store('leaf', true)
    # end

    # structureArray = structureArray + employeeArray
    @structureData = array_to_tree(structureArray)
    render :json => @structureData
  end

end
