class AddDocumentsMotionTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENTS_MOTION (
        ID        number(12, 0) not null,
        PARENT_ID number(12, 0),
        STATUS    varchar2(20) default 'open' not null,
        ---------
        FROM_USER_ID number(10, 0),
        FROM_ID      number(10, 0),
        FROM_TYPE    varchar2(50),
        FROM_TEXT    varchar2(1000),
        FROM_IS_READ number(1,0) default 0 not null,
        ---------
        TO_USER_ID   number(10, 0),
        TO_ID        number(10, 0),
        TO_TYPE      varchar2(50),
        TO_TEXT      varchar2(1000),
        TO_IS_READ   number(1,0) default 0 not null,
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
