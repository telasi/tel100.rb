class AddPartyTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table PARTY_BASE (
        ID         number(10, 0) not null,
        TYPE       varchar2(20 CHAR) not null,
        IDENTITY	 varchar2(30 CHAR),
        NAME_KA    varchar2(200 CHAR),
        NAME_RU    varchar2(200 CHAR),
        NAME_EN    varchar2(200 CHAR),
        ADDRESS_KA varchar2(500 CHAR),
        ADDRESS_RU varchar2(500 CHAR),
        ADDRESS_EN varchar2(500 CHAR),
        PHONES		 varchar2(100 CHAR),
        EMAIL      varchar2(50 CHAR),
        ACCOUNT    varchar2(50 CHAR),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint PARTY_BASE_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence PARTY_BASE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger PARTY_BASE_BEFORE_INSERT
      before insert on PARTY_BASE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := PARTY_BASE_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop sequence PARTY_BASE_SEQ"
  	execute "drop table PARTY_BASE"
  end
end
