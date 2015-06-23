# -*- encoding : utf-8 -*-
class CreateUsersTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table USERS (
        ID number(10,0) not null,
        EMAIL varchar2(100 CHAR),
        MOBILE varchar2(100 CHAR),
        PHONE varchar2(10 CHAR),
        USERNAME varchar2(100 CHAR) not null,
        EMAIL_CONFIRMED  number(1, 0) default 0 not null,
        MOBILE_CONFIRMED number(1, 0) default 0 not null,
        IS_ACTIVE        number(1, 0) default 1 not null,
        IS_ADMIN         number(1, 0) default 0 not null,
        -- get this information from the last employee the user was assigned
        EMPLOYEE_ID number(10, 0),
        PERSON_ID   number( 8, 0), -- hr_id
        FIRST_NAME_KA varchar2(50 CHAR) not null,
        FIRST_NAME_RU varchar2(50 CHAR),
        FIRST_NAME_EN varchar2(50 CHAR),
        LAST_NAME_KA varchar2(50 CHAR) not null,
        LAST_NAME_RU varchar2(50 CHAR),
        LAST_NAME_EN varchar2(50 CHAR),
        -- eflow connection
        EFLOW_USER_NAME varchar2(100),
        NEED_REFRESH number(1, 0) default 0 not null,
        ---------------------------------------------------------
        PASSWORD_HASH char(60 CHAR) not null,
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint USERS_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create unique index USERS_EMAIL_IDX on USERS (EMAIL)
    SQL

    execute <<-SQL
      create unique index USERS_USERNAME_IDX on USERS (USERNAME)
    SQL

    execute <<-SQL
      create sequence USERS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger USERS_BEFORE_INSERT
      before insert on USERS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := USERS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute <<-SQL
      drop trigger USERS_BEFORE_INSERT
    SQL

    execute <<-SQL
      drop sequence USERS_SEQ
    SQL

    execute <<-SQL
      drop index USERS_USERNAME_IDX
    SQL

    execute <<-SQL
      drop index USERS_EMAIL_IDX
    SQL

    execute <<-SQL
      drop table USERS
    SQL
  end
end
