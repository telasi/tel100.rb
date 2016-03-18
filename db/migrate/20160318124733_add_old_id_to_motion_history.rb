class AddOldIdToMotionHistory < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_MOTION_HISTORY 
      ADD ( OLD_ID NUMBER(12,0) NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_MOTION_HISTORY 
      DROP COLUMN OLD_ID
    SQL
  end
end
