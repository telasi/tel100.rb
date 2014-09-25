# -*- encoding : utf-8 -*-
class HR::Employee < ActiveRecord::Base
  self.table_name  = 'hr_employees'
  self.sequence_name = 'hr_employees_seq'
end
