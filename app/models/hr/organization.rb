# -*- encoding : utf-8 -*-
class HR::Organization < ActiveRecord::Base
  self.table_name  = 'hr_organizations'
  self.sequence_name = 'hr_orgs_seq'
  self.localized_field('name')
  self.set_integer_columns :is_manager, :is_active
  belongs_to :parent, class_name: 'HR::Organization', foreign_key: 'parent_id'

  def self.active; HR::Organization.where(is_active: 1) end
  def saporg_number; self.saporg_id.to_s.rjust(8, '0') end
  def chain; self.parent ? self.parent.chain << self : [self] end
  def manager?; self.is_manager == 1 end
  def active?; self.is_active == 1 end

  def icon; 'bank' end
end
