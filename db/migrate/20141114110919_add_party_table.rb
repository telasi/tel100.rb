class AddPartyTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table PARTY (
        ID          number(10, 0) not null,
        ORG_ID		number(15, 0),
        ORG_NAME	varchar2(200 CHAR),
        PERSON_ID   number(15, 0),
        PERSON_NAME	varchar2(200 CHAR),
        ADDRESS		varchar2(500 CHAR),
        PHONES		varchar2(1000 CHAR),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint PARTY_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence PARTY_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger PARTY_BEFORE_INSERT
      before insert on PARTY
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := PARTY_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop sequence PARTY_SEQ"
  	execute "drop table PARTY"
  end
end
