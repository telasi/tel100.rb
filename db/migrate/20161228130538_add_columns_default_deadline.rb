class AddColumnsDefaultDeadline < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE 
      ADD ( DEADLINE NUMBER(12,0) DEFAULT 0 NOT NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE  
      DROP COLUMN DEADLINE
    SQL
  end
end
