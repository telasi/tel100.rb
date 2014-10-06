# -*- encoding : utf-8 -*-
class CreateOrganizationsTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table HR_ORGANIZATIONS (
        ID          number(10, 0) not null,
        PARENT_ID   number(10, 0),
        TREE_LEVEL  number(3, 0) default 0 not null,
        IS_ACTIVE   number(1, 0) default 1 not null,
        SAPORG_ID   number(8, 0),
        SAPORG_TYPE varchar2(1 CHAR),
        SAPPARENT_ID number(8, 0),
        NAME_KA     varchar2(500 CHAR) not null,
        NAME_RU     varchar2(500 CHAR),
        NAME_EN     varchar2(500 CHAR),
        IS_MANAGER  number(1, 0) default 0 not null,
        PRIORITY    varchar2( 2 CHAR),
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint HR_ORGS_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create sequence HR_ORGS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger HR_ORGS_BEFORE_INSERT
      before insert on HR_ORGANIZATIONS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := HR_ORGS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute <<-SQL
      drop trigger HR_ORGS_BEFORE_INSERT
    SQL

    execute <<-SQL
      drop sequence HR_ORGS_SEQ
    SQL

    execute <<-SQL
      drop table HR_ORGANIZATIONS
    SQL
  end
end
