class AddDocumentsTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENTS (
        ID          number(10, 0) not null,
        LANGUAGE    char(2) default 'KA' not null,
        PARENT_ID   number(10, 0),
        DOCTYPE     varchar2(20) default 'letter' not null,
        DIRECTION   varchar2(20) default 'inner'  not null,
        SUBJECT     varchar2(1000),
        BODY        clob,
        ORIGINAL_NUMBER varchar(50),
        DOCNUMBER   varchar2(20),
        DOCDATE     date not null,
        DOCYEAR     number( 4, 0) not null,
        PAGE_COUNT  number( 6, 0),
        ADDITIONS_COUNT number(6, 0),
        DUE_DATE    date,
        ALARM_DATE  date,
        STATUS     varchar2(20) default 'open' not null,
        -----
        AUTHOR_USER_ID number(10,0),
        AUTHOR_ID      number(10,0),
        AUTHOR_TYPE    varchar2(50),
        SENDER_USER_ID number(10,0),
        SENDER_ID      number(10,0),
        SENDER_TYPE    varchar2(50),
        OWNER_USER_ID  number(10,0),
        OWNER_ID       number(10,0),
        OWNER_TYPE     varchar2(50),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCUMENTS_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCUMENTS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCUMENTS_BEFORE_INSERT
      before insert on DOCUMENTS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCUMENTS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCUMENTS_BEFORE_INSERT"
    execute "drop sequence DOCUMENTS_SEQ"
    execute "drop table DOCUMENTS"
  end
end
