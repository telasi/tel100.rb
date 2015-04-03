# -*- encoding : utf-8 -*-
class AddDocumentUser < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_USER (
        DOCUMENT_ID  number(10, 0) not null,
        USER_ID      number(10, 0) not null,
        -- ROLE         varchar2(10 CHAR) not null,
        -- STATUS       number(1, 0) default 0 not null,
        ----- read
        IS_NEW       number(1, 0) default 1 not null,
        IS_CHANGED   number(1, 0) default 1 not null,
        ----- send/receive
        IS_FORWARDED number(1, 0) default 0 not null,
        IS_SENDED    number(1, 0) default 0 not null,
        IS_RECEIVED  number(1, 0) default 0 not null,
        ----- status
        IS_CURRENT   number(1, 0) default 0 not null,
        IS_CANCELED  number(1, 0) default 0 not null,
        IS_COMPLETED number(1, 0) default 0 not null,
        ----- ownership
        AS_OWNER     number(1, 0) default 0 not null,
        AS_ASSIGNEE  number(1, 0) default 0 not null,
        AS_SIGNEE    number(1, 0) default 0 not null,
        AS_AUTHOR    number(1, 0) default 0 not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCUSER_PRIMARYKEY primary key ( DOCUMENT_ID, USER_ID ) enable
      )
    SQL

    execute <<-SQL
      create unique index DOCUMENT_USER_FLAGS_IDX on DOCUMENT_USER (IS_NEW,IS_CHANGED,IS_FORWARDED,IS_SENDED,IS_RECEIVED,IS_CURRENT,IS_CANCELED,IS_COMPLETED,AS_OWNER,AS_ASSIGNEE,AS_SIGNEE,AS_AUTHOR)
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.AS_OWNER IS '0: not owner; 1: has current status as owner; 2: had complete (completed/canceled) status as owner'
    SQL
  end

  def down
    execute "drop index DOCUMENT_USER_FLAGS_IDX"
    execute "drop table DOCUMENT_USER"
  end
end
