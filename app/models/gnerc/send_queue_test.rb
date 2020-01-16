# -*- encoding : utf-8 -*-
class Gnerc::SendQueueTest < ActiveRecord::Base
  establish_connection :gnerc_test
  self.table_name  = 'temo.queue'
end