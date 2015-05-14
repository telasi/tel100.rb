class UserRelation < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table USER_RELATIONS (
        USER_ID number(10,0) not null,
        RELATED_ID number(10, 0) not null,
        constraint USER_RELS_PRIMARYKEY primary key ( user_id, related_id ) enable
      )
    SQL
  end

  def down
    execute <<-SQL
      drop table USER_RELATIONS;
    SQL
  end
end
