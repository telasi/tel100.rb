class AddCustomFoldersTables < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table FOLDER_BASE (
        ID           NUMBER(10,0) NOT NULL,
        OWNER_ID     NUMBER(10,0) NOT NULL,
        NAME         VARCHAR2(100 CHAR),
        FOLDER_TYPE  VARCHAR2(50) NOT NULL,
        ORDER_BY     NUMBER(3,0),
        PARENT_ID		 NUMBER(10,0),
        CREATED_AT   TIMESTAMP (6) WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
        UPDATED_AT   TIMESTAMP (6) WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
        CONSTRAINT folder_base_primarykey PRIMARY KEY (id) enable
      )
    SQL

    execute <<-SQL
      create index OWNER_ID_IDX on FOLDER_BASE (OWNER_ID)
    SQL

    execute <<-SQL
      create sequence FOLDER_BASE_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger FOLDER_BASE_BEFORE_INSERT
      before insert on FOLDER_BASE
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := FOLDER_BASE_SEQ.nextval;
        END IF;
      END;
    SQL

  	execute <<-SQL
      create table FOLDER_DOCUMENTS (
      	ID         NUMBER(10,0) NOT NULL,
      	DOC_ID     NUMBER(10,0) NOT NULL,
        created_at TIMESTAMP (6) WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
        updated_at TIMESTAMP (6) WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
      )
    SQL

    execute <<-SQL
       alter table folder_documents add constraint folder_doc_unique UNIQUE (folder_id, doc_id)
    SQL
  end

  def down
  	execute "drop table FOLDER_DOCUMENTS"
    execute "drop sequence FOLDER_BASE_SEQ"
    execute "drop index OWNER_ID_IDX"
    execute "drop table FOLDER_BASE"
  end
end
