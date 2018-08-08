class AddStepToGnerc < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( STEP NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN STEP
    SQL
  end
end
