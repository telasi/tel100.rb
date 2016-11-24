class AddGnercSubtypeTable < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table DOCUMENT_TYPE_GNERC_SUBTYPE (
        ID            number(5, 0) not null,
        NAME_KA       varchar2(150) not null,
        NAME_RU       varchar2(150),
        NAME_EN       varchar2(150),
        -----
        CREATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint DOCTYPEGNERCSUBTYPE_PRIMARYKEY primary key ( ID ) enable
      )
    SQL

    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (5, 'სარეზერვო კვება (ელექტრომომარაგების ალტერნატიული წყაროს მოწყობა)', 'სარეზერვო კვება (ელექტრომომარაგების ალტერნატიული წყაროს მოწყობა)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (9, 'შიდა ქსელის მოწყობა/რეკონსტრუქცია (მ.შ. ქვე მრიცხველის, ქსელისა ან/და დამატებითი წერტილის მოწყობა)', 'შიდა ქსელის მოწყობა/რეკონსტრუქცია (მ.შ. ქვე მრიცხველის, ქსელისა ან/და დამატებითი წერტილის მოწყობა)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (10, 'აღურიცხავი-უცნობი მიერთების რეგისტრაცია', 'აღურიცხავი-უცნობი მიერთების რეგისტრაცია')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (11, 'რეგისტრაციის აღდგენა ძველი აბონენტის', 'რეგისტრაციის აღდგენა ძველი აბონენტის')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (12, 'ნასყიდობის ხელშეკრულების გაფორმება', 'ნასყიდობის ხელშეკრულების გაფორმება')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (13, 'განაცხადის/წერილის გაუქმება', 'განაცხადის/წერილის გაუქმება')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (14, 'აბ/მომხმ. მიერ პირადი ინფორმაციის მოთხოვნა', 'აბ/მომხმ. მიერ პირადი ინფორმაციის მოთხოვნა')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (15, 'დავალიანების გადანაწილება', 'დავალიანების გადანაწილება')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (16, 'განვადების/დავალიანების გადახდის გრაფიკის გაუქმება', 'განვადების/დავალიანების გადახდის გრაფიკის გაუქმება')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (17, 'თანხის კორექცია', 'თანხის კორექცია')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (18, 'აღ. კვანძის მოწესრიგება (მ.შ. მრიცხველის შეცვლა, დალუქვა, ლუქის დაზიანება და მრიცხველის სხვა დაზიანება)', 'აღ. კვანძის მოწესრიგება (მ.შ. მრიცხველის შეცვლა, დალუქვა, ლუქის დაზიანება და მრიცხველის სხვა დაზიანება)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (19, 'კომპანიის ქსელის დაზიანება', 'კომპანიის ქსელის დაზიანება')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (20, 'მომარაგების შეწყვეტა/აღდგენა', 'მომარაგების შეწყვეტა/აღდგენა')
    SQL

    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (1, 'ახალი მიერთება ურთიერთშეთანხმებით (სამუშაოების მოთხოვნით/ტექნიკური პირობის საფუძველზე)', 'ახალი მიერთება ურთიერთშეთანხმებით (სამუშაოების მოთხოვნით/ტექნიკური პირობის საფუძველზე)')
    # SQL
    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (2, 'აბონენტის გაყოფა (უძრავი ქონების გაყოფის შემთხვევაში)', 'აბონენტის გაყოფა (უძრავი ქონების გაყოფის შემთხვევაში)')
    # SQL
    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (3, 'ქსელზე შეჭრისა და აღრიცხვის კვანძის მოწყობის მოთხოვნა', 'ქსელზე შეჭრისა და აღრიცხვის კვანძის მოწყობის მოთხოვნა')
    # SQL
    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (4, 'სიმძლავრის გაზრდა (მოხმარების დასაშვები მოცულობის გაზრდა)', 'სიმძლავრის გაზრდა (მოხმარების დასაშვები მოცულობის გაზრდა)')
    # SQL
    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (6, 'დროებითი მიერთება გამ. ქსელზე (დროებითი სამშენებლო და სხვა სამუშაოები)', 'დროებითი მიერთება გამ. ქსელზე (დროებითი სამშენებლო და სხვა სამუშაოები)')
    # SQL
    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (7, 'ქვეაბონენტად აყვანა (დროებითი აბონენტი)', 'ქვეაბონენტად აყვანა (დროებითი აბონენტი)')
    # SQL
    # execute <<-SQL
    #   insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
    #   VALUES (8, 'გამ.ქსელის გადატანა-რეკონსტრუქცია', 'გამ.ქსელის გადატანა-რეკონსტრუქცია')
    # SQL
  end

  def down
    execute "drop table DOCUMENT_TYPE_GNERC_SUBTYPE"
  end
end
