# -*- encoding : utf-8 -*-
class AddDocumentMotionTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_MOTION (
        ID        number(12, 0) not null,
        PARENT_ID number(12, 0),
        DOCUMENT_ID number(10, 0) not null,
        STATUS    varchar2(20 CHAR) default 'open' not null,
        MOTION_TEXT varchar2(1000 CHAR),
        RESPONSE_TEXT varchar2(1000 CHAR),
        DUE_DATE date,
        ---------
        SENDER_USER_ID number(10, 0),
        SENDER_ID      number(10, 0),
        SENDER_TYPE    varchar2(50 CHAR),
        SENDER_IS_READ number(1,0) default 0 not null,
        ---------
        RECEIVER_USER_ID number(10, 0),
        RECEIVER_ID      number(10, 0),
        RECEIVER_TYPE    varchar2(50 CHAR),
        RECEIVER_IS_READ number(1,0) default 0 not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCMOTION_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCMOTION_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCMOTION_BEFORE_INSERT
      before insert on DOCUMENT_MOTION
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCMOTION_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCMOTION_BEFORE_INSERT"
    execute "drop sequence DOCMOTION_SEQ"
    execute "drop table DOCUMENT_MOTION"
  end
end
