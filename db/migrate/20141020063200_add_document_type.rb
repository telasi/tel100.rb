# -*- encoding : utf-8 -*-
class AddDocumentType < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_TYPE (
        ID       number(5, 0) not null,
        NAME_KA  varchar2(50) not null,
        NAME_RU  varchar2(50),
        NAME_EN  varchar2(50),
        ORDER_BY number(5, 0) default 0 not null,
        MARGIN_TOP number(5, 0),
        MARGIN_BOTTOM number(5, 0),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCTYPE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence DOCTYPES_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger DOCTYPES_BEFORE_INSERT
      before insert on DOCUMENT_TYPE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := DOCTYPES_SEQ.nextval;
        END IF;
      END;
    SQL

    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('სამსახურეობრივი წერილი', 'Служебная карточка', 1)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('დავალება', 'Задание', 2)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('ბრძანება', 'Приказ', 3)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('განკარგულება', 'Постановление', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('განცხადება', 'Заявление', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('მოხსენებითი ბარათი', '', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('ოქმი', 'Заключение', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('შეტყობინება', '', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('ცნობა', '', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('წერილი', 'Письмо', 4)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('აქტი', 'Акт', 4)
    SQL
  end

  def down
    execute "drop trigger DOCTYPES_BEFORE_INSERT"
    execute "drop sequence DOCTYPES_SEQ"
    execute "drop table DOCUMENT_TYPE"
  end
end
