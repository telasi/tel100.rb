class AddGnercAnswerStatus < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC
      ADD ( STATUS NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC
      ADD ( MEDIATE NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL
  end

  def down
  	execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC
      DROP COLUMN MEDIATE
    SQL
    
    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC
      DROP COLUMN STATUS
    SQL
  end
end
