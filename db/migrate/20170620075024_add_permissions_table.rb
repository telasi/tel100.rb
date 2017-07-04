class AddPermissionsTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table PERMISSIONS (
        ID          number(10, 0) not null,
        ROLE    	  varchar2(100),
        PERMISSION  varchar2(200),
        ACTION      varchar2(200),

        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null, -- შექმნა (DRAFT)
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint PERM_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence PERM_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger PERM_BEFORE_INSERT
      before insert on PERMISSIONS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := PERM_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger PERM_BEFORE_INSERT"
    execute "drop sequence PERM_SEQ"
    execute "drop table PERMISSIONS"
  end
end
