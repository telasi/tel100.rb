class AddVacationTables < ActiveRecord::Migration
  def up
  	execute <<-SQL
      create table HR_VACATION_TYPE (
        ID       NUMBER(3,0) NOT NULL,
        NAME_KA  VARCHAR2(100 CHAR),
        NAME_RU  VARCHAR2(100 CHAR),
        NAME_EN  VARCHAR2(100 CHAR),
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
        EMPLOYEE_ID                 NUMBER(10,0) NOT NULL,
        PERSON_ID                   NUMBER(10,0) NOT NULL,
        REQUESTER                   NUMBER(10,0) NOT NULL,
        FROM_DATE                   DATE,
        TO_DATE                     DATE,
        VACATION_TYPE               NUMBER(3,0),
        SUBSTITUDE                  NUMBER(10,0),
        SUB_PERSON_ID               NUMBER(10,0),
        SUBSTITUDE_TYPE             NUMBER(1,0),
        CONFIRMED                   NUMBER(1,0),
        SALARY                      VARCHAR2(10 CHAR),
        PERCENT                     NUMBER(3,0),
        NOTE                        VARCHAR2(1000 CHAR),
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

    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('ბიულეტინი', 'Больничный')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('ანაზღაურებადი შვებულება ორსულობის, მშობიარობის და ბავშვის მოვლის გამო', 'Оплачиваемый декрет')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('არაანაზღაურებადი შვებულება', 'Неоплачиваемый отпуск')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('არაანაზღაურებადი შვებულება ორსულობის, მშობიარობისა და ბავშვის მოვლის გამო', 'Неоплачиваемый декрет')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('ანაზღაურებადი შვებულება', 'Оплачиваемый отпуск')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('სარეზერვო სამსახური', 'Резерв')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('სავალდებულო სამხედრო სამსახური', 'Служба в армии')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('სასწავლო შვებულება', 'Учебный отпуск')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('მივლინება', 'Командировка')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('ანაზღაურებადი შვებულება ბავშვის აყვანის გამო', 'Отпуск по усыновлению')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('არაანაზღაურებადი შვებულება ბავშვის აყვანის გამო', 'Неоплачиваемый отпуск по усыновлению')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('დამატებითი შვებულება ბავშვის მოვლის გამო', 'Дополнительный отпуск по уходу за ребенком')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('დამატებითი ანაზღაურებადი შვებულება მძიმე პირობებში მუშაობაზე', 'Дополн. опл. отпуск за тяжелые и вредные условия')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('სწავლის დაწყების პირველი დღე', 'Первый день учебного года')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('დაოჯახება', 'Вступление в брак')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('შვილის დაბადება', 'Рождение ребенка')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('ოჯახის წევრ. გარდაცვალება', 'Кончина члена семьи')
    SQL
    execute <<-SQL
      insert into HR_VACATION_TYPE (NAME_KA, NAME_RU) values ('ზეგანაკვეთური ნამუშევარი დროის კომპენსაცია', 'Компенсация сверх отработанного времени')
    SQL
  end

  def down
    execute "drop sequence HR_VACATION_SEQ"
  	execute "drop table HR_VACATION"
    execute "drop sequence HR_VACATION_TYPE_SEQ"
    execute "drop table HR_VACATION_TYPE"
  end
end
