class AddDocumentUser < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_USER (
        DOCUMENT_ID  number(10, 0) not null,
        USER_ID      number(10, 0) not null,
        STATUS       number(1, 0) default 0 not null,
        IS_READ      number(1, 0) default 0 not null,
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCUSER_PRIMARYKEY primary key ( DOCUMENT_ID, USER_ID ) enable
      )
    SQL
  end

  def down
    execute "drop table DOCUMENT_USER"
  end
end
