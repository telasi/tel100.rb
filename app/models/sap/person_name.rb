# -*- encoding : utf-8 -*-
class Sap::PersonName < ActiveRecord::Base
  include Sap::Base

  self.table_name  = 'sap_person_name'
end
