# -*- encoding : utf-8 -*-
class Gnerc::Docflow8 < ActiveRecord::Base
  establish_connection :gnerc
  self.table_name  = 'docflow8'
end