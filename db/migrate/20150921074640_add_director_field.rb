class AddDirectorField < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE USERS 
      ADD ( IS_DIRECTOR NUMBER(1,0) DEFAULT 0 NOT NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE USERS
      DROP COLUMN IS_DIRECTOR
    SQL
  end
end
