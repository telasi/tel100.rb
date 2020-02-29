# -*- encoding : utf-8 -*-
class Gnerc::Docflow6Old < ActiveRecord::Base
  establish_connection :gnerc_old
  self.table_name  = 'semek.docflow6'
  self.set_integer_columns :affirmative, :public_service_hall #, :response_id
end