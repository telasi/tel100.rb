class AddChangesTable < ActiveRecord::Migration
   def up
    execute <<-SQL
      create table DOCUMENT_CHANGE (
        ID number(10, 0) not null,
        DOCUMENT_ID number(10, 0) not null,
        USER_ID     number(10, 0) not null,
        SUBJECT     varchar2(1000),
        DOCNUMBER2  varchar2(20),
        DOCDATE     date,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCCHANGE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCCHANGE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCCHANGE_BEFORE_INSERT
      before insert on DOCUMENT_CHANGE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCCHANGE_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCCHANGE_BEFORE_INSERT"
    execute "drop sequence DOCCHANGE_SEQ"
    execute "drop table DOCUMENT_CHANGE"
  end
end
