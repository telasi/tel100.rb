class ChangeOrganizationSequence < ActiveRecord::Migration
  def up
  	execute "drop trigger HR_ORGS_BEFORE_INSERT"

  	execute <<-SQL
      create trigger HR_ORGS_BEFORE_INSERT
      before insert on HR_ORGANIZATIONS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := HR_EMPLOYEES_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
  	execute "drop trigger HR_ORGS_BEFORE_INSERT"

  	execute <<-SQL
      create trigger HR_ORGS_BEFORE_INSERT
      before insert on HR_ORGANIZATIONS
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := HR_ORGS_SEQ.nextval;
        END IF;
      END;
    SQL
  end
end
