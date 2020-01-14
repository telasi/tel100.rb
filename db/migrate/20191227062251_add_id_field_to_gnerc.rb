class AddIdFieldToGnerc < ActiveRecord::Migration
  def up
  	execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( CUSTOMER_TAXID VARCHAR2(12) )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN CUSTOMER_TAXID
    SQL
  end
end
