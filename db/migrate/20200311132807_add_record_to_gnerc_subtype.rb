class AddRecordToGnercSubtype < ActiveRecord::Migration
  def up
  	execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (66, 'გამანაწილებელი ქსელის დაზიანება', 'გამანაწილებელი ქსელის დაზიანება')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (67, 'ელექტრონული ქვითრის მოთხოვნა', 'ელექტრონული ქვითრის მოთხოვნა')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (68, 'სხვა', 'სხვა')
    SQL
  end

end
