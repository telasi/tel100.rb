class AddTemplatesTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table USER_TEMPLATES (
        ID        number(10, 0) not null,
        USER_ID    	number(10, 0),
        NAME    	varchar2(100),
        CATEGORY	number(1, 0),
        BODY        clob,

        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint USER_TEMPLATES_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence USERTEMPLATES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger USER_TEMPLATES_BEFORE_INSERT
      before insert on USER_TEMPLATES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := USERTEMPLATES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger USER_TEMPLATES_BEFORE_INSERT"
    execute "drop sequence USERTEMPLATES_SEQ"
    execute "drop table USER_TEMPLATES"
  end
end
