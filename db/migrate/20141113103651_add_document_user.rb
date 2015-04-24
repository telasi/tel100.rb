# -*- encoding : utf-8 -*-
class AddDocumentUser < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_USER (
        DOCUMENT_ID  number(10, 0) not null,
        USER_ID      number(10, 0) not null,
        ---------
        HAS_DUE_DATE       number(1, 0) default 0 not null,
        COMPLETED_OVER_DUE number(1, 0) default 0 not null,
        CURRENT_DUE_DATE   date,
        ----- read
        IS_NEW       number(1, 0) default 1 not null,
        IS_CHANGED   number(1, 0) default 1 not null,
        IS_SHOWN     number(1, 0) default 0 not null,
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
      create index DOCUMENT_USER_ISSHOWN_IDX on DOCUMENT_USER (IS_SHOWN)
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.IS_SHOWN IS 'should this document be shown to the user?'
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
      COMMENT ON COLUMN DOCUMENT_USER.AS_OWNER IS '0: not owner; 1: has pending status as owner; 2: has completed status as owner; 3: has canceled status as owner'
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.AS_AUTHOR IS '0: not author; 1: has pending status as author; 2: has completed status as author; 3: has canceled status as author'
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.AS_SIGNEE IS '0: not signee; 1: has pending status as signee; 2: has completed status as signee; 3: has canceled status as signee'
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.AS_ASSIGNEE IS '0: not assignee; 1: has pending status as assignee; 2: has completed status as assignee; 3: has canceled status as assignee'
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.COMPLETED_OVER_DUE IS 'if any motions were completed after due date'
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_USER.CURRENT_DUE_DATE IS 'minimum due_date of current motions'
    SQL
  end

  def down
    execute "drop table DOCUMENT_USER"
  end
end
