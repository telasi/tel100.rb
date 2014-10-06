class AddDocumentsMotionTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENTS_MOTION (
        ID        number(12, 0) not null,
        PARENT_ID number(12, 0),
        DOCUMENT_ID number(10, 0) not null,
        STATUS    varchar2(20) default 'open' not null,
        ---------
        SENDER_USER_ID number(10, 0),
        SENDER_ID      number(10, 0),
        SENDER_TYPE    varchar2(50),
        SENDER_TEXT    varchar2(1000),
        SENDER_IS_READ number(1,0) default 0 not null,
        ---------
        RECEIVER_USER_ID number(10, 0),
        RECEIVER_ID      number(10, 0),
        RECEIVER_TYPE    varchar2(50),
        RECEIVER_TEXT    varchar2(1000),
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
      before insert on DOCUMENTS_MOTION
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
    execute "drop table DOCUMENTS_MOTION"
  end
end
