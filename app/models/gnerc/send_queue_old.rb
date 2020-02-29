# -*- encoding : utf-8 -*-
class Gnerc::SendQueueOld < ActiveRecord::Base
  establish_connection :gnerc_old
  self.table_name  = 'semek.queue'
end