class AddDocumentRelation < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_RELATION (
        ID number(10, 0) not null,
        BASE_ID number(10, 0) not null,
        RELATED_ID number(10, 0) not null,
        RELATED_TYPE varchar2(100) not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCREL_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCREL_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCRELS_BEFORE_INSERT
      before insert on DOCUMENT_RELATION
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCREL_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCRELS_BEFORE_INSERT"
    execute "drop sequence DOCREL_SEQ"
    execute "drop table DOCUMENT_RELATION"
  end
end
