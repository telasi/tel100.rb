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
        IS_SENT      number(1, 0) default 0 not null,
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
      create index DOCUMENT_USER_ISNEW_IDX on DOCUMENT_USER (IS_NEW)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISCHANGED_IDX on DOCUMENT_USER (IS_CHANGED)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISFORWARDED_IDX on DOCUMENT_USER (IS_FORWARDED)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISSENT_IDX on DOCUMENT_USER (IS_SENT)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISRECEIVED_IDX on DOCUMENT_USER (IS_RECEIVED)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISCURRENT_IDX on DOCUMENT_USER (IS_CURRENT)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISCANCELED_IDX on DOCUMENT_USER (IS_CANCELED)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ISCOMPLETED_IDX on DOCUMENT_USER (IS_COMPLETED)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ASOWNER_IDX on DOCUMENT_USER (AS_OWNER)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ASASSIGNEE_IDX on DOCUMENT_USER (AS_ASSIGNEE)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ASSIGNEE_IDX on DOCUMENT_USER (AS_SIGNEE)
    SQL
    execute <<-SQL
      create index DOCUMENT_USER_ASAUTHOR_IDX on DOCUMENT_USER (AS_AUTHOR)
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.AS_OWNER IS '0: not owner; 1: has current status as owner; 2: had complete (completed/canceled) status as owner'
    SQL
  end

  def down
    execute "drop table DOCUMENT_USER"
  end
end
