class ChangeTypeIdConstraint < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_BASE 
      MODIFY ( TYPE_ID NULL )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_BASE 
      MODIFY ( TYPE_ID NOT NULL )
    SQL
  end
end
