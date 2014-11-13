class AddDocumentUser < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_USER (
        DOCUMENT_ID number(10, 0) not null,
        USER_ID     number(10, 0) not null,
        IS_AUTHOR   number(1, 0) default 0 not null,
        IS_SIGNEE   number(1, 0) default 0 not null,
        IS_RECEIVER number(1, 0) default 0 not null,
        constraint DOCUSER_PRIMARYKEY primary key ( DOCUMENT_ID, USER_ID ) enable
      )
    SQL
  end

  def down
    execute "drop table    DOCUMENT_USER"
  end
end
