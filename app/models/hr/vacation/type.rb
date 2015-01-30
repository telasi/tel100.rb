# -*- encoding : utf-8 -*-
class HR::Vacation::Type < ActiveRecord::Base
  self.table_name  = 'hr_vacation_type'
  self.sequence_name = 'hr_vacation_type_seq'
  self.localized_field('name')
end