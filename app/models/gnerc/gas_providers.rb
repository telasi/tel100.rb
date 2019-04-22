# -*- encoding : utf-8 -*-
class Gnerc::GasProviders < ActiveRecord::Base
  self.table_name  = 'gas_providers'

  self.set_integer_columns :agree_gas, :agree_water
end