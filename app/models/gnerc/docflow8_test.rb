# -*- encoding : utf-8 -*-
class Gnerc::Docflow8Test < ActiveRecord::Base
  establish_connection :gnerc_test
  self.table_name  = 'docflow8'
  self.set_integer_columns :affirmative, :mediate, :response_id
end