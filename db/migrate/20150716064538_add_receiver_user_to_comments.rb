class AddReceiverUserToComments < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_COMMENT 
      ADD ( RECEIVER_USER_ID NUMBER(10,0) )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_COMMENT 
      DROP COLUMN RECEIVER_USER_ID
    SQL
  end
end
