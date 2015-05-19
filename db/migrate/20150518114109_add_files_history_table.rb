class AddFilesHistoryTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_FILE_HISTORY (
        ID number(10, 0) not null,
        DOCUMENT_ID number(10, 0) not null,
        ORIGINAL_NAME varchar2(500) not null,
        STORE_NAME varchar2(64) not null,
        CHANGE_NO number(10, 0),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCFILEHIS_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCFILEHIS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCFILEHIS_BEFORE_INSERT
      before insert on DOCUMENT_FILE_HISTORY
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCFILEHIS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCFILEHIS_BEFORE_INSERT"
    execute "drop sequence DOCFILEHIS_SEQ"
    execute "drop table DOCUMENT_FILE_HISTORY"
  end
end
