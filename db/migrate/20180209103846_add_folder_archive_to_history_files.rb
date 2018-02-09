class AddFolderArchiveToHistoryFiles < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE_HISTORY
      ADD ( FOLDER varchar2(64) )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE_HISTORY
      ADD ( ARCHIVED NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE_HISTORY
      DROP COLUMN ARCHIVED
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_FILE_HISTORY
      DROP COLUMN FOLDER
    SQL
  end
end
