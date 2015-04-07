class AddResponseTypes < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_RESPONSE_TYPES (
        ID number(6, 0) not null,
        ROLE     varchar2(15) not null,
        DIRECTION number(1,0) not null,
        ORDERING number(5, 0) not null,
        NAME_KA  varchar2(50) not null,
        NAME_RU  varchar2(50),
        NAME_EN  varchar2(50),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCRESPTYPE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create index DOCRESPTYPE_ROLE_DIRCT_IDX on DOCUMENT_RESPONSE_TYPES (ROLE, DIRECTION,ORDERING)
    SQL

    execute <<-SQL
      create sequence DOCRESPTYPE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCRESPTYPE_BEFORE_INSERT
      before insert on DOCUMENT_RESPONSE_TYPES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCRESPTYPE_SEQ.nextval;
        END IF;
      END;
    SQL

    # owner
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('owner', 2, 1, 'დასრულება')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('owner', 3, 1, 'გაუქმება')
    SQL

    # author
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('author', 1, 1, 'ხელმოსაწერად')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('author', 2, 1, 'ხელმოწერილი')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('author', 3, 1, 'ხელს არ ვაწერ')
    SQL

    # signee
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('signee', 1, 1, 'დასავიზირებლად')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('signee', 2, 1, 'დავიზირებული')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('signee', 3, 1, 'არ ვავიზირებ')
    SQL

    # asignee
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('assignee', 1, 1, 'შესასრულებლად')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('assignee', 1, 1, 'გასაცნობად')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('assignee', 2, 1, 'შევასრულე')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('assignee', 2, 1, 'გავეცანი')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('assignee', 3, 1, 'ვერ ვასრულებ')
    SQL
    execute <<-SQL
      insert into DOCUMENT_RESPONSE_TYPES (role, direction, ordering, name_ka) values ('assignee', 3, 1, 'არ მეხება')
    SQL
  end

  def down
    execute "drop trigger  DOCRESPTYPE_BEFORE_INSERT"
    execute "drop sequence DOCRESPTYPE_SEQ"
    execute "drop index    DOCRESPTYPE_ROLE_DIRCT_IDX"
    execute "drop table    DOCUMENT_RESPONSE_TYPES"
  end
end
