# -*- encoding : utf-8 -*-
class HR::Party < ActiveRecord::Base
  self.table_name  = 'party_base'
  self.sequence_name = 'party_base_seq'

  def to_s; self.name_ka end

  validate :name_entered

  def name_entered
  	errors.add('Name must be entered') if self.name_ka.nil? and self.name_ru.nil? and self.name_en.nil?
  end
end
