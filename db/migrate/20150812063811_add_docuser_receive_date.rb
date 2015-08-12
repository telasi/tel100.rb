class AddDocuserReceiveDate < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_USER  ADD (RECEIVE_DATE DATE)
    SQL

    execute <<-SQL
      CREATE INDEX DOCUSER_RECEIVE_DATE_IDX ON DOCUMENT_USER (RECEIVE_DATE DESC)
    SQL
  end

  def down
    execute <<-SQL
      DROP INDEX DOCUSER_RECEIVE_DATE_IDX
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_USER DROP COLUMN RECEIVE_DATE
    SQL
  end
end
