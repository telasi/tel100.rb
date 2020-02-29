# -*- encoding : utf-8 -*-
class Gnerc::Docflow6 < ActiveRecord::Base
  establish_connection :gnerc
  self.table_name  = 'docflow6'
  self.set_integer_columns :affirmative, :public_service_hall, :response_id
end