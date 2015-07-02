class AddSpecialColumnToDoctypes < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE 
      ADD ( IS_SPECIAL NUMBER(1,0) default 0 not null )
    SQL

    execute <<-SQL
      COMMENT ON COLUMN DOCUMENT_TYPE.IS_SPECIAL IS 'Document is special when you can assign additional number to it and define document date manually (upon creation).'
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE 
      DROP COLUMN IS_SPECIAL
    SQL
  end
end
