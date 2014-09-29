# -*- encoding : utf-8 -*-
class HR::Organization < ActiveRecord::Base
  self.table_name  = 'hr_organizations'
  self.sequence_name = 'hr_orgs_seq'
  self.localized_field('name')
end
