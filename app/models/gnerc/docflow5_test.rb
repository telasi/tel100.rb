# -*- encoding : utf-8 -*-
class Gnerc::Docflow5Test < ActiveRecord::Base
  establish_connection :gnerc_test
  self.table_name  = 'temo.docflow5'
  self.set_integer_columns :affirmative, :mediate, :response_id
end