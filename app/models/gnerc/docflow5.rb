# -*- encoding : utf-8 -*-
class Gnerc::Docflow5 < ActiveRecord::Base
  establish_connection :gnerc
  self.table_name  = 'docflow5'
end