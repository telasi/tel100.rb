class AddFolderArchiveToFiles < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE
      ADD ( FOLDER varchar2(64) )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE
      ADD ( ARCHIVED NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE
      DROP COLUMN ARCHIVED
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE
      DROP COLUMN FOLDER
    SQL
  end
end
