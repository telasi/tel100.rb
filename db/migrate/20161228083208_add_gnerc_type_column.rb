class AddGnercTypeColumn < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE 
      ADD ( IS_GNERC NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL

    execute <<-SQL
      UPDATE DOCUMENT_TYPE SET IS_GNERC = 1, DEADLINE = 10 WHERE ID = 13
      UPDATE DOCUMENT_TYPE SET IS_GNERC = 1, DEADLINE = 10 WHERE ID = 14
      UPDATE DOCUMENT_TYPE SET IS_GNERC = 1, DEADLINE = 5 WHERE ID = 15
      UPDATE DOCUMENT_TYPE SET IS_GNERC = 1, DEADLINE = 5 WHERE ID = 16
    SQL

    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (22, 'სხვა', 'სხვა')
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE  
      DROP COLUMN IS_GNERC
    SQL
  end
end
