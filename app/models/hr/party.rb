# -*- encoding : utf-8 -*-
class HR::Party < ActiveRecord::Base
  self.table_name  = 'party'
  self.sequence_name = 'party_seq'
end