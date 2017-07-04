class AddRolesTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table ROLES (
        ID        number(10, 0) not null,
        NAME    	varchar2(100),
        CATEGORY	number(10, 0),

        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null, -- შექმნა (DRAFT)
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint ROLES_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence ROLES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger ROLES_BEFORE_INSERT
      before insert on ROLES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := ROLES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger ROLES_BEFORE_INSERT"
    execute "drop sequence ROLES_SEQ"
    execute "drop table ROLES"
  end
end
