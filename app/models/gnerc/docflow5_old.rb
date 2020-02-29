# -*- encoding : utf-8 -*-
class Gnerc::Docflow5Old < ActiveRecord::Base
  establish_connection :gnerc_old
  self.table_name  = 'semek.docflow5'
  self.set_integer_columns :affirmative, :mediate #, :response_id
end