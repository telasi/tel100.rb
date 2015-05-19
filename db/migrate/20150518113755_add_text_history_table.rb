class AddTextHistoryTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_TEXT_HISTORY (
        ID number(10, 0) not null,
      	DOCUMENT_ID number(10, 0) not null,
        BODY        clob,
        CHANGE_NO   number(10, 0),
        constraint DOCTEXTHIS_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCTEXTHIS_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCTEXTHIS_BEFORE_INSERT
      before insert on DOCUMENT_TEXT_HISTORY
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCTEXTHIS_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger DOCTEXTHIS_BEFORE_INSERT"
    execute "drop sequence DOCTEXTHIS_SEQ"
    execute "drop table DOCUMENT_TEXT_HISTORY"
  end
end
