class AddVacationTables < ActiveRecord::Migration
  def up
  	execute <<-SQL
      create table HR_VACATION_TYPE (
        ID       NUMBER(3,0) NOT NULL,
        NAME_KA  VARCHAR2(50 CHAR),
        NAME_RU  VARCHAR2(50 CHAR),
        NAME_EN  VARCHAR2(50 CHAR),
        CONSTRAINT hr_vacation_typeprimarykey PRIMARY KEY (id) enable
      )
    SQL

    execute <<-SQL
      create sequence HR_VACATION_TYPE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger HR_VACATION_TYPE_BEFORE_INSERT
      before insert on HR_VACATION_TYPE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := HR_VACATION_TYPE_SEQ.nextval;
        END IF;
      END;
    SQL

  	execute <<-SQL
      create table HR_VACATION (
        ID                          NUMBER(10,0) NOT NULL,
        USERID                      NUMBER(10,0) NOT NULL,
        FROM_DATE                   DATE,
        TO_DATE                     DATE,
        VACATION_TYPE               NUMBER(3,0),
        SUBSTITUDE                  NUMBER(10,0),
        SUBSTITUDE_TYPE             NUMBER(1,0),
        CONFIRMED                   NUMBER(1,0),
        created_at                  TIMESTAMP (6) WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
        updated_at                  TIMESTAMP (6) WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    SQL

    execute <<-SQL
      create sequence HR_VACATION_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger HR_VACATION_BEFORE_INSERT
      before insert on HR_VACATION
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := HR_VACATION_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop sequence HR_VACATION_SEQ"
  	execute "drop table HR_VACATION"
    execute "drop sequence HR_VACATION_TYPE_SEQ"
    execute "drop table HR_VACATION_TYPE"
  end
end
