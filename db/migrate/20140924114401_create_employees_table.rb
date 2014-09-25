class CreateEmployeesTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table HR_EMPLOYEES (
        ID            number(10, 0) not null,
        IS_ACTIVE     number( 1, 0) default 1 not null,
        PERSON_ID     varchar2( 8 CHAR) not null,
        USER_ID       number(10, 0),
        FIRST_NAME_KA varchar2(50 CHAR) not null,
        LAST_NAME_KA  varchar2(50 CHAR) not null,
        FIRST_NAME_RU varchar2(50 CHAR) not null,
        LAST_NAME_RU  varchar2(50 CHAR) not null,
        ORGANIZATION_ID    number(10, 0) not null,
        EMPLOYEE_STATUS_ID number( 1, 0) default 3 not null,
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSDATE not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSDATE not null,
        constraint HR_EMPLOYEE_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      create index HR_EMPLOYEES_STATUS_IDX on HR_EMPLOYEES (IS_ACTIVE, PERSON_ID)
    SQL

    execute <<-SQL
      create sequence HR_EMPLOYEES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger HR_EMPLOYEES_BEFORE_INSERT
      before insert on HR_EMPLOYEES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := HR_EMPLOYEES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute <<-SQL
      drop trigger HR_EMPLOYEES_BEFORE_INSERT
    SQL

    execute <<-SQL
      drop sequence HR_EMPLOYEES_SEQ
    SQL

    execute <<-SQL
      drop index HR_EMPLOYEES_STATUS_IDX
    SQL

    execute <<-SQL
      drop table HR_EMPLOYEES
    SQL
  end
end
