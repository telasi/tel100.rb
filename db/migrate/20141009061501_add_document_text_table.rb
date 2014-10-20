# -*- encoding : utf-8 -*-
class AddDocumentTextTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_TEXT (
        DOCUMENT_ID number(10, 0) not null,
        BODY        clob,
        constraint DOCTEXTS_PRIMARYKEY primary key ( DOCUMENT_ID ) enable
      )
    SQL
  end

  def down
    execute "drop table DOCUMENT_TEXT"
  end
end
