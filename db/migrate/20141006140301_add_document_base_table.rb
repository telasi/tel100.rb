# -*- encoding : utf-8 -*-
class AddDocumentBaseTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_BASE (
        ID          number(10, 0) not null,
        LANGUAGE    char(2) default 'KA' not null,
        PARENT_ID   number(10, 0),
        TYPE_ID     number(5, 0) not null,
        DIRECTION   varchar2(20 CHAR) default 'inner'  not null,
        SUBJECT     varchar2(1000 CHAR),
        ORIGINAL_NUMBER varchar(50 CHAR),
        ORIGINAL_DATE   date,
        DOCNUMBER   varchar2(20 CHAR),
        DOCDATE     date not null,
        DOCYEAR     number( 4, 0) not null,
        PAGE_COUNT  number( 6, 0),
        ADDITIONS_COUNT number(6, 0),
        DUE_DATE    date,
        ALARM_DATE  date,
        STATUS      number(1, 0) default 0 not null,
        -----
        SENDER_USER_ID number(10,0),
        SENDER_ID      number(10,0),
        SENDER_TYPE    varchar2(50 CHAR),
        OWNER_USER_ID  number(10,0),
        OWNER_ID       number(10,0),
        OWNER_TYPE     varchar2(50 CHAR),
        -----
        MOTIONS_TOTAL     number(6, 0) default 0 not null,
        MOTIONS_COMPLETED number(6, 0) default 0 not null,
        MOTIONS_CANCELED  number(6, 0) default 0 not null,
        COMMENTS_TOTAL    number(6,0)  default 0 not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCBASE_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCBASE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCBASE_BEFORE_INSERT
      before insert on DOCUMENT_BASE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCBASE_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCBASE_BEFORE_INSERT"
    execute "drop sequence DOCBASE_SEQ"
    execute "drop table DOCUMENT_BASE"
  end
end
