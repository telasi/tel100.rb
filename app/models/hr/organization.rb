# -*- encoding : utf-8 -*-
class HR::Organization < ActiveRecord::Base
  self.table_name  = 'hr_organizations'
  self.sequence_name = 'hr_orgs_seq'
  self.localized_field('name')
  belongs_to :parent, class_name: 'HR::Organization', foreign_key: 'parent_id'

  def saporg_number; self.saporg_id.to_s.rjust(8, '0') end
  def chain; self.parent ? self.parent.chain << self : [self] end
end
