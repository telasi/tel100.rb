# -*- encoding : utf-8 -*-
class AddCustomerView < ActiveRecord::Migration
  def up
  	execute <<-SQL
      CREATE VIEW CUSTOMER ("CUSTKEY", "NAME", "ADDRESS", "TAXID", "ACCNUMB") AS 
		  (SELECT  a.custkey,
		           TRANSLATE (
		              TRANSLATE (a.custname USING NCHAR_CS),
		              'ÀÁÂÃÄÅÆÈÉÊËÌÍÏÐÑÒÓÔÖ×ØÙÚÛÜÝÞßàáãä',
		              N'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ')
		              name,
		           TRANSLATE (
		              TRANSLATE ( TRIM (s.streetname) || ' ' || TRIM (ad.house) || ' ' || TRIM (ad.building) || ' ' || TRIM (ad.porch) || ' ' || TRIM (ad.flate) USING NCHAR_CS),
		              'ÀÁÂÃÄÅÆÈÉÊËÌÍÏÐÑÒÓÔÖ×ØÙÚÛÜÝÞßàáã',
		              N'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ')
		              ADDRESS,
		           a.taxid,
		           a.accnumb
		      FROM bs.customer@bs a,
		           bs.street@bs s,
		           bs.address@bs ad
		     WHERE ad.premisekey = a.premisekey AND ad.streetkey = s.streetkey)
    SQL
  end

  def down
  	execute "drop view CUSTOMER"
  end
end
