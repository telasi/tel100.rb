class DocumentTypeDirectionRestrictions < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE ADD ( ALLOW_INNER NUMBER(1,0) default 1 not null  )
    SQL
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE ADD ( ALLOW_IN    NUMBER(1,0) default 1 not null  )
    SQL
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE ADD ( ALLOW_OUT   NUMBER(1,0) default 1 not null  )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE DROP COLUMN ALLOW_INNER
    SQL
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE DROP COLUMN ALLOW_IN
    SQL
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE DROP COLUMN ALLOW_OUT
    SQL
  end
end
