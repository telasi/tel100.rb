class AddDocumentSignature < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_SIGNATURE (
        ID number(12, 0) not null,
        DOCUMENT_ID number(10, 0) not null,
        ------
        SIGNATURE_USER_ID number(10, 0),
        SIGNATURE_ID      number(10, 0),
        SIGNATURE_TYPE    varchar2(50 CHAR),
        NOTE              varchar2(500 CHAR),
        SIGN_ROLE         varchar2(10 CHAR) default 'signee' not null,
        SIGN_STATUS       varchar2(10 CHAR) default 'none' not null,
        SIGN_GROUP        number(5) default 0 not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCSIGNS_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCSIGNS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCSIGNS_BEFORE_INSERT
      before insert on DOCUMENT_SIGNATURE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCSIGNS_SEQ.nextval;
        END IF;
      END;
    SQL

    execute <<-SQL
      create index DOCSIGNS_BASE_IDX on DOCUMENT_SIGNATURE (DOCUMENT_ID)
    SQL
  end

  def down
    execute "drop index    DOCSIGNS_BASE_IDX"
    execute "drop trigger  DOCSIGNS_BEFORE_INSERT"
    execute "drop sequence DOCSIGNS_SEQ"
    execute "drop table    DOCUMENT_SIGNATURE"
  end
end
