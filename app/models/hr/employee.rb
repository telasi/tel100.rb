# -*- encoding : utf-8 -*-
class HR::Employee < ActiveRecord::Base
  MALE = 'M'
  FEMALE = 'F'
  NOT_SPECIFIED = 'N'

  self.table_name  = 'hr_employees'
  self.sequence_name = 'hr_employees_seq'
  self.localized_fields('first_name', 'last_name')
  self.set_integer_columns :is_active, :employee_status_id
  belongs_to :organization, class_name: 'HR::Organization'
  has_one :user, class_name: 'Sys::User'

  def self.active; HR::Employee.where(is_active: 1) end
  def to_s; self.full_name end
  def person_number; self.person_id.to_s.rjust(5, '0') end
  def full_name; "#{first_name} #{last_name}" end
  def active?; self.is_active == 1 end
  def employee_status; I18n.t("models.hr_employee.employee_status_id.val#{self.employee_status_id}") end

  def to_hash(opts = {})
    org = opts[:organization] || self.organization
    {
      id: self.id,
      is_active: self.active?,
      person_number: self.person_number,
      user_id: self.user_id,
      first_name: self.first_name,
      last_name: self.last_name,
      gender: self.gender,
      employee_status: self.employee_status,
      position_id: org.id,
      position: org.name.strip,
      is_manager: org.manager?,
      priority: org.priority,
      created_at: self.created_at,
      updated_at: self.updated_at,
      # for hr.Tree
      parent_id: org.parent_id,
      ext_type: 'hr.Employee'
    }
  end

  def to_html
    header = "<strong><code>#{self.person_number}</code> #{self.full_name}</strong>"
    if self.organization.present?
      details = self.organization.chain.map do |x|
        "<span style=\"color: #666;\">#{x.name.strip}</span>"
      end.join('; ')
    end
    "#{header} &mdash; #{details}"
  end

  def self.find_by_name(name)
    name.split(' ').map do |phrase|
      HR::Employee.where("first_name_ka LIKE :phrase or first_name_ru LIKE :phrase or first_name_en LIKE :phrase or 
                          last_name_ka LIKE :phrase or last_name_ru LIKE :phrase or last_name_en LIKE :phrase", {phrase: '%'+phrase+'%'}).map{|emp| emp.id }
    end.flatten
  end
end
