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
      item.store('key', "P#{item.delete('id')}")
      item.store('id', item['key'])
      item.store('parent_id', item.delete('organization_id'))
      item.store('title', item.delete("first_name_#{I18n.locale}") + " " + item.delete("last_name_#{I18n.locale}"))
      item.store('icon', "images/tree/HRtreeiconP.png")
      item.store('leaf', true)
    end

    structureArray = structureArray + employeeArray
    @structureData = array_to_tree_hash(structureArray)
    render :json => @structureData
  end

  def array_to_tree_hash(data)
    object_hash = data.index_by{|node| node["id"]}
    object_hash[nil] = {:root => true}

    object_hash.each_value {|node|
      next if node[:root]
      next if node["parent_id"] && !object_hash[node["parent_id"]] # throw away orphans

      children = object_hash[node["parent_id"]][:children] ||= []
      children << node
      object_hash[node["parent_id"]][:leaf] = false
    }

    tree = object_hash[nil]
  end

  # def array_to_tree(data)
  #   data.select{|i| i.has_key?('saporg_id')}.each do |item|
  #      item['children'] = data.select { |_item| ( _item['parent_id'] == item['id'] or _item['organization_id'] == item['id'] )}
  #      item.delete('leaf') if item.has_key?('children')
  #   end
  #   data.delete_if{ |item| item.has_key?('organization_id') }
  #   data.select{ |item| item['parent_id'] == nil }
  # end
end
