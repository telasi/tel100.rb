# -*- encoding : utf-8 -*-
class BS::Customer < ActiveRecord::Base
  self.table_name  = 'customer'
  self.primary_key = 'custkey'

  def to_s; self.name end
end