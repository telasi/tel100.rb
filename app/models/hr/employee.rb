# -*- encoding : utf-8 -*-
class HR::Employee < ActiveRecord::Base
  self.table_name  = 'hr_employees'
  self.sequence_name = 'hr_employees_seq'
  self.localized_fields('first_name', 'last_name')

  def person_number; self.person_id.to_s.rjust(5, '0') end
  def full_name; "#{first_name} #{last_name}" end
end
