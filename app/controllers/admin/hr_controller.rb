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
    @employees = HR::Employee.where(organization: @organization)
    @title = @organization.present? ? @organization.name : 'სს თელასი'
  end

  def structure
    @structure = HR::Organization.where(is_active: 1).order(saporg_type: :desc).order(is_manager: :desc).order(priority: :asc)
    #@structure = HR::Organization.where(saporg_id: nil).where(is_active: 1).order(is_manager: :desc).order(priority: :asc)
    @employees = HR::Employee.where(is_active: 1)

    structureArray = @structure.as_json(except: [:created_at, :updated_at])
    employeeArray  = @employees.as_json(only: [ "first_name_#{I18n.locale}", "last_name_#{I18n.locale}", :id, :organization_id, :is_manager])

    structureArray.each do |item|
      item.store('key', "#{item['id']}")
      item.store('title', item.delete("name_#{I18n.locale}") )
      item.store('icon', "images/tree/HRtreeicon#{item['saporg_type']}#{'M' if item['is_manager']}.png")
      item.store('leaf', true)
    end

    employeeArray.each do |item|
      item.store('key', "#{item.delete('id')}")
      item.store('title', item.delete("first_name_#{I18n.locale}") + " " + item.delete("last_name_#{I18n.locale}"))
      item.store('icon', "images/tree/HRtreeiconP.png")
      item.store('leaf', true)
    end

    structureArray = structureArray + employeeArray
    render :json => @structureData = array_to_tree(structureArray)
  end

  def array_to_tree(data)
    data.select{|i| i.has_key?('saporg_id')}.each do |item|
       item['children'] = data.select { |_item| ( _item['parent_id'] == item['id'] or _item['organization_id'] == item['id'] )}
       item.delete('leaf') if item.has_key?('children')
    end
    data.delete_if{ |item| item.has_key?('organization_id') }
    
    # data.select{|i| i.has_key?('children')}.each do |item|
    #   item.store('leaf', true)
    # end

    # data.each do |item|
    #   if !item.has_key?('children')
    #     raise item.has_key?('children').inspect
    #   end
    #    item.store('leaf', true) if not item.has_key?('children')
    # end

    data.select{ |item| item['parent_id'] == nil }
  end
end
