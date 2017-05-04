class AddGnerSmsTable < ActiveRecord::Migration
def up
    execute <<-SQL
      create table DOCUMENT_SMS (
        ID number(10, 0) not null,
        BASE_ID number(10, 0) not null,
        ANSWER_ID number(10, 0),
        USER_ID NUMBER(10, 0) not null,
        TEXT varchar2(255) not null,
        ACTIVE NUMBER(1,0) not null,
        PHONE VARCHAR2(10),
        SENT_AT TIMESTAMP WITH TIME ZONE,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCSMS_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCSMS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCSMS_BEFORE_INSERT
      before insert on DOCUMENT_SMS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCSMS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCSMS_BEFORE_INSERT"
    execute "drop sequence DOCSMS_SEQ"
    execute "drop table DOCUMENT_SMS"
  end
end
