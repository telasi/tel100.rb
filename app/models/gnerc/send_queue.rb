# -*- encoding : utf-8 -*-
class Gnerc::SendQueue < ActiveRecord::Base
  establish_connection :gnerc
  self.table_name  = 'queue'
end