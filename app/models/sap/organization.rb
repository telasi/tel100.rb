# -*- encoding : utf-8 -*-
#class Sap::Organization < ActiveRecord::Base
class Sap::Organization < ActiveRecord::Base
  include Sap::Base

  self.table_name  = 'sap_organizations'

  def name_ru 
  	text = Sap::OrganizationText.current.where(objectid: self.objectid, objecttype: self.objecttype, language: 'RU').first
  	text.name if text 
  end

  def name_ka 
  	text = Sap::OrganizationText.current.where(objectid: self.objectid, objecttype: self.objecttype, language: 'KA').first
  	text.name if text
  end
  
  def is_manager?; Sap::Relation.where(objectid: self.objectid, objecttype: self.objecttype, relation: 'A012').count; end
end