class AddDocumentGnercTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_GNERC (
        DOCUMENT_ID number(10, 0) not null,
        TYPE_ID number(5, 0),
        FILE_ID number(10,0),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCGNERC_PRIMARYKEY primary key ( DOCUMENT_ID ) enable
      )
    SQL
  end

  def down
    execute "drop table DOCUMENT_GNERC"
  end
end
