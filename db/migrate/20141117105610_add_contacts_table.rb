# -*- encoding : utf-8 -*-
class AddContactsTable < ActiveRecord::Migration
  def up
	execute <<-SQL
      create table PARTY_CONTACTS (
        ID         		number(10, 0) not null,
        PARENT_ID  		number(10, 0),
        FIRST_NAME_KA 	varchar2(50 CHAR) not null,
        FIRST_NAME_RU 	varchar2(50 CHAR),
        FIRST_NAME_EN 	varchar2(50 CHAR),
        LAST_NAME_KA  	varchar2(50 CHAR) not null,
        LAST_NAME_RU  	varchar2(50 CHAR),
        LAST_NAME_EN  	varchar2(50 CHAR),
        PHONES			varchar2(20 CHAR),
        EMAIL      		varchar2(50 CHAR),
        ACCOUNT    		varchar2(50 CHAR),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint PARTY_CONTACTS_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence PARTY_CONTACTS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger PARTY_CON_BEFORE_INSERT
      before insert on PARTY_CONTACTS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := PARTY_CONTACTS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down 
    execute "drop sequence PARTY_CONTACTS_SEQ"
  	execute "drop table PARTY_CONTACTS"
  end

end
