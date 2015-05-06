# -*- encoding : utf-8 -*-
class Sap::OrganizationText < ActiveRecord::Base
  include Sap::Base

  self.table_name  = 'sap_organization_texts'
end