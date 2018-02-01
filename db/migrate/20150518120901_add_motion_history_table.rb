# -*- encoding : utf-8 -*-
class AddMotionHistoryTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_MOTION_HISTORY (
        ID          number(12, 0) not null,
        PARENT_ID   number(12, 0),
        DOCUMENT_ID number(10, 0) not null,
        IS_NEW      number( 1, 0) default 1 not null,
        DUE_DATE    date,
        ---------
        ORDERING    number(3) default 999 not null,
        ---------
        SEND_TYPE_ID   number(5, 0),
        MOTION_TEXT    varchar2(2000 CHAR),
        SENDER_USER_ID number(10, 0),
        ACTUAL_SENDER_ID number(10,0),
        SENDER_ID      number(10, 0),
        SENDER_TYPE    varchar2(50 CHAR),
        ---------
        RESP_TYPE_ID     number(5, 0),
        RESPONSE_TEXT    varchar2(2000 CHAR),
        RECEIVER_USER_ID number(10, 0),
        LAST_RECEIVER_ID number(10,0),
        RECEIVER_ID      number(10, 0),
        RECEIVER_TYPE    varchar2(50 CHAR),
        RECEIVER_ROLE    varchar2(10 CHAR) default 'assignee' not null,
        -----
        STATUS       number( 1, 0) default 0 not null,
        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null, -- შექმნა (DRAFT)
        SENT_AT      TIMESTAMP, -- გაგზავნა  (SENT / NOT_SENT)
        RECEIVED_AT  TIMESTAMP, -- მიღება    (CURRENT / NOT_RECEIVED)
        COMPLETED_AT TIMESTAMP, -- შესრულება (COMPLETED / CANCELED)
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        CHANGE_NO    number(10, 0),
        -----
        constraint DOCMOTIONHIS_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCMOTIONHIS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCMOTIONHIS_BEFORE_INSERT
      before insert on DOCUMENT_MOTION_HISTORY
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCMOTIONHIS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCMOTIONHIS_BEFORE_INSERT"
    execute "drop sequence DOCMOTIONHIS_SEQ"
    execute "drop table DOCUMENT_MOTION_HISTORY"
  end
end
