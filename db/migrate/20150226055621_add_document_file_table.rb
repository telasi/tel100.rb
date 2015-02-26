class AddDocumentFileTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_FILE (
        ID number(10, 0) not null,
        ORIGINAL_NAME varchar2(500) not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCFILE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCFILES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCFILES_BEFORE_INSERT
      before insert on DOCUMENT_FILE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCFILES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCFILES_BEFORE_INSERT"
    execute "drop sequence DOCFILES_SEQ"
    execute "drop table DOCUMENT_FILE"
  end
end
