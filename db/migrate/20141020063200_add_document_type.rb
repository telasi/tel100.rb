class AddDocumentType < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_TYPE (
        ID number(5, 0) not null,
        NAME_KA VARCHAR2(50) not null,
        NAME_RU VARCHAR2(50),
        NAME_END VARCHAR2(50),
        ORDER_BY NUMBER(5, 0) default 0 not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCTYPE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCTYPES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCTYPES_BEFORE_INSERT
      before insert on DOCUMENT_TYPE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCTYPES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCTYPES_BEFORE_INSERT"
    execute "drop sequence DOCTYPES_SEQ"
    execute "drop table DOCUMENT_TYPE"
  end
end
