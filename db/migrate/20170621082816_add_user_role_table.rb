class AddUserRoleTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table USER_ROLES (
        ID        	number(10, 0) not null,
        USER_ID    	number(10, 0),
        ROLE_ID		number(10, 0),

        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null, -- შექმნა (DRAFT)
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint USERROLES_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence USER_ROLES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger USRROLES_BEFORE_INSERT
      before insert on USER_ROLES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := USER_ROLES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger USRROLES_BEFORE_INSERT"
    execute "drop sequence USER_ROLES_SEQ"
    execute "drop table USER_ROLES"
  end
end
