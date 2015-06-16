# -*- encoding : utf-8 -*-
class Sap::Relation < ActiveRecord::Base
  include Sap::Base

  self.table_name  = 'sap_relations'
  self.primary_key = [:OBJECTID, :OBJECTTYPE, :BEGIN_DATE, :END_DATE, :RELATION, :VARYF]

  def organization; Sap::Organization.current.where(objectid: self.objectid, objecttype: self.objecttype).first; end
  def self.relevant; Sap::Relation.where("relation IN ('A002', 'A003', 'B008') and objecttype IN ('O', 'S')"); end
  def self.current_structure; Sap::Relation.current.relevant; end;
end
