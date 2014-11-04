# -*- encoding : utf-8 -*-
class HR::Employee < ActiveRecord::Base
  self.table_name  = 'hr_employees'
  self.sequence_name = 'hr_employees_seq'
  self.localized_fields('first_name', 'last_name')
  self.set_integer_columns :is_active, :employee_status_id
  belongs_to :organization, class_name: 'HR::Organization'
  has_one :user, class_name: 'Sys::User'

  def to_s; "#{self.person_number} - #{self.full_name}" end
  def person_number; self.person_id.to_s.rjust(5, '0') end
  def full_name; "#{first_name} #{last_name}" end
  def active?; self.is_active == 1 end
  def employee_status; I18n.t("models.hr_employee.employee_status_id.val#{self.employee_status_id}") end

  def ext_name; self.full_name end
  def ext_id; "P#{self.id}" end
  def ext_icon; 'user' end

  def self.active; HR::Employee.where(is_active: 1) end
end
