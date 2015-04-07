class AddFavouriteTable < ActiveRecord::Migration
 def up
    execute <<-SQL
      create table PARTY_FAVOURITES (
        ID          number(10, 0) not null,
        USER_ID     number(10, 0) not null,
        PERSON_ID   number(10, 0) not null,
        PERSON_TYPE varchar2(50 CHAR) not null,
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint PARFAV_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      create sequence PARTYFAV_SEQ increment by 1 start with 1 nocache
    SQL

    execute <<-SQL
      create trigger PARTYFAV_BEFORE_INSERT
      before insert on PARTY_FAVOURITES
      for each row
      BEGIN
        IF :new.ID is null
        THEN
          :new.ID := PARTYFAV_SEQ.nextval;
        END IF;
      END;
    SQL
  end

  def down
    execute "drop trigger PARTYFAV_BEFORE_INSERT"
    execute "drop sequence PARTYFAV_SEQ"
    execute "drop table PARTY_FAVOURITES"
  end
end
