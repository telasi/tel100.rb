class AddUserSettings < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table USER_SETTINGS (
        USER_ID    	number(10, 0),
        NOTIF_MAIL  number(1,0) default 1 not null,
        NOTIF_SMS   number(1,0) default 1 not null,

        constraint USERSET_PRIMARYKEY primary key ( USER_ID ) enable
      )
    SQL
  end

  def down
    execute "drop table USER_SETTINGS"
  end
end
