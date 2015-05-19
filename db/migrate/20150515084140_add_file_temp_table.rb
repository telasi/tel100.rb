class AddFileTempTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_FILE_TEMP (
        ID number(10, 0) not null,
        DOCUMENT_ID number(10, 0) not null,
        ORIGINAL_NAME varchar2(500) not null,
        STORE_NAME varchar2(64) not null,
        STATE number(1,0) default 0 not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCFILETEMP_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCFILESTEMP_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCFILESTEMP_BEFORE_INSERT
      before insert on DOCUMENT_FILE_TEMP
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCFILESTEMP_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCFILESTEMP_BEFORE_INSERT"
    execute "drop sequence DOCFILESTEMP_SEQ"
    execute "drop table DOCUMENT_FILE_TEMP"
  end
end
