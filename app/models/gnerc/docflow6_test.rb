# -*- encoding : utf-8 -*-
class Gnerc::Docflow6Test < ActiveRecord::Base
  establish_connection :gnerc_test
  self.table_name  = 'temo.docflow6'
  self.set_integer_columns :affirmative, :public_service_hall, :response_id
end