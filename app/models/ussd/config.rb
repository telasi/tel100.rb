# -*- encoding : utf-8 -*-
class Ussd::Config < ActiveRecord::Base
    self.table_name  = 'sms.ussd_teldoc_types'
    self.primary_key = 'id'
end