class AddSendOrderings < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_SEND_ORDERINGS (
        ROLE    varchar2(10 CHAR) not null,
        USER_ID number(10,0) not null,
        TYPE_ID number(5, 0) not null,
        ORDERING number(4,0) not null,
        -----
        constraint DOCSENDORDERINGS_PRIMARYKEY primary key ( ROLE, USER_ID, TYPE_ID ) enable
      )
    SQL
  end

  def down
    execute "drop table    DOCUMENT_SEND_ORDERINGS"
  end
end
