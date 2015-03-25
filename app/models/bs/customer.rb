# -*- encoding : utf-8 -*-
class BS::Customer < ActiveRecord::Base
  self.table_name  = 'customer'
  self.primary_key = 'custkey'
end