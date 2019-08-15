# -*- encoding : utf-8 -*-
class Sap::Person < ActiveRecord::Base
  include Sap::Base

  self.table_name  = 'sap_persons'
  self.set_integer_columns :status

  def self.assigned; Sap::Person.current.where('organization > 0'); end
  def first_name_ru; Sap::PersonName.current.where(person_id: self.person_id, language: 'RU').first.firstname; end
  def first_name_ka; Sap::PersonName.current.where(person_id: self.person_id, language: 'KA').first.firstname; end
  def last_name_ru; Sap::PersonName.current.where(person_id: self.person_id, language: 'RU').first.lastname; end
  def last_name_ka; Sap::PersonName.current.where(person_id: self.person_id, language: 'KA').first.lastname; end
  def org; Sap::PersonOrg.current.where(person_id: self.person_id).first; end
  def organization; HR::Organization.active.where(saporg_id: self.org.shtat, saporg_type: 'S').first; end
  def org_id; self.organization ? self.organization.id : nil; end

  def person_name(language); Sap::PersonName.current.where(person_id: self.person_id, language: language).first end
end
