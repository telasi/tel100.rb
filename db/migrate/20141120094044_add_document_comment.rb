# -*- encoding : utf-8 -*-
class AddDocumentComment < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_COMMENT (
        ID           number(12, 0) not null,
        DOCUMENT_ID  number(10, 0) not null,
        USER_ID      number(10, 0) not null,
        STATUS       number(1, 0) default 0 not null,
        OPERATION    varchar2(30 CHAR) not null,
        TEXT         varchar2(1000 CHAR),
        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCCOMMENT_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCCOMMENT_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCCOMMENT_BEFORE_INSERT
      before insert on DOCUMENT_COMMENT
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCCOMMENT_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop sequence DOCCOMMENT_SEQ"
    execute "drop table DOCUMENT_COMMENT"
  end
end
