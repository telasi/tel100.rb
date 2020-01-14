# -*- encoding : utf-8 -*-
class Gnerc::Docflow8 < ActiveRecord::Base
  establish_connection :gnerc
  self.table_name  = 'docflow8'
  self.set_integer_columns :affirmative, :mediate #, :response_id
end