class AddColumnsToGnercTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( STAGE NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( SENT_AT TIMESTAMP )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC
      DROP COLUMN STAGE
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC
      DROP COLUMN SENT_AT
    SQL
  end
end
