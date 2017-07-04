class AddUploadFileTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table UPLOAD_FILE (
      	DOCUMENT_ID number(10, 0),
        USER_ID    	number(10, 0),

        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null, -- შექმნა (DRAFT)
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        CONSTRAINT uploadfile_primary_key PRIMARY KEY (DOCUMENT_ID, USER_ID)
      )
    SQL
  end

  def down
    execute "drop table UPLOAD_FILE"
  end
end
