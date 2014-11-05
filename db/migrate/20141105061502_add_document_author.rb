# -*- encoding : utf-8 -*-
class AddDocumentAuthor < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_AUTHOR (
        ID number(12, 0) not null,
        ------
        AUTHOR_USER_ID number(10, 0),
        AUTHOR_ID      number(10, 0),
        AUTHOR_TYPE    varchar2(50 CHAR),
        NOTE           varchar2(500 CHAR),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCAUTHOR_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCAUTHORS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCAUTHORS_BEFORE_INSERT
      before insert on DOCUMENT_AUTHOR
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCAUTHORS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCAUTHORS_BEFORE_INSERT"
    execute "drop sequence DOCAUTHORS_SEQ"
    execute "drop table DOCUMENT_AUTHOR"
  end
end
