class AddResponseTypes < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_RESPONSE_TYPES (
        ID number(5, 0) not null,
        ORDERING number(5, 0) not null,
        TYPEKEY  number(1, 0) not null,
        NAME_KA  varchar2(50) not null,
        NAME_RU  varchar2(50),
        NAME_EN  varchar2(50),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCRESPTYPE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCRESPTYPE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCRESPTYPE_BEFORE_INSERT
      before insert on DOCUMENT_RESPONSE_TYPES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCRESPTYPE_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger  DOCRESPTYPE_BEFORE_INSERT"
    execute "drop sequence DOCRESPTYPE_SEQ"
    execute "drop table    DOCUMENT_RESPONSE_TYPES"
  end
end
