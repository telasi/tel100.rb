# -*- encoding : utf-8 -*-
class Sap::PersonOrg < ActiveRecord::Base
  include Sap::Base

  self.table_name  = 'sap_person_org'

end