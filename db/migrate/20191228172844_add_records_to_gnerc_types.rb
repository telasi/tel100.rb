class AddRecordsToGnercTypes < ActiveRecord::Migration
  def up
  	execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE_GNERC_SUBTYPE 
      ADD ( OLD NUMBER(1,0) )
    SQL

    execute <<-SQL
       update DOCUMENT_TYPE_GNERC_SUBTYPE set old = 1
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (50, 'აღურიცხავი/უცნობი მიერთების რეგისტრაცია/ძველი აბონენტის რეგისტრაციის აღდგენა', 'აღურიცხავი/უცნობი მიერთების რეგისტრაცია/ძველი აბონენტის რეგისტრაციის აღდგენა')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (51, 'მომარაგების დაწყება', 'მომარაგების დაწყება')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (53, 'ნასყიდობის ხელშეკრულების გაფორმება', 'ნასყიდობის ხელშეკრულების გაფორმება')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (54, 'განაცხადის/წერილის გაუქმება', 'განაცხადის/წერილის გაუქმება')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (55, 'მომხმარებლის მიერ პირადი ინფორმაციის მოთხოვნა', 'მომხმარებლის მიერ პირადი ინფორმაციის მოთხოვნა')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (56, 'დავალიანების გადანაწილება', 'დავალიანების გადანაწილება')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (57, 'განვადების/დავალიანების გადახდის გრაფიკის გაუქმება', 'განვადების/დავალიანების გადახდის გრაფიკის გაუქმება')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (58, 'თანხის კორექცია', 'თანხის კორექცია')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (59, 'მომხმარებლის თხოვნით მომარაგების შეწყვეტა/აღდგენა', 'მომხმარებლის თხოვნით მომარაგების შეწყვეტა/აღდგენა')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (61, 'აღრიცხვის კვანძის მოწესრიგება (მათ შორის, მრიცხველის შეცვლა, დალუქვა)', 'აღრიცხვის კვანძის მოწესრიგება (მათ შორის, მრიცხველის შეცვლა, დალუქვა)')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (62, 'მომხმარებლის შიდა ქსელის სამუშაოები (შიდა ქსელის მოწყობა მოწყობა/რეკონსტრუქცია, ქვეაბონენტის მრიცხველის დამონტაჟება)', 'მომხმარებლის შიდა ქსელის სამუშაოები (შიდა ქსელის მოწყობა მოწყობა/რეკონსტრუქცია, ქვეაბონენტის მრიცხველის დამონტაჟება)')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (63, 'გამანაწილებელი ქსელის გადატანა/რეკონსტრუქცია (მათ შორის, მრიცხველის გატანა)', 'გამანაწილებელი ქსელის გადატანა/რეკონსტრუქცია (მათ შორის, მრიცხველის გატანა)')
    SQL

    execute <<-SQL
       insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
       VALUES (64, 'ურთიერთშეთანხმებით მიერთების სამუშაოები (მათ შორის, დროებითი)', 'ურთიერთშეთანხმებით მიერთების სამუშაოები (მათ შორის, დროებითი)')
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE DOCUMENT_TYPE_GNERC_SUBTYPE 
      DROP COLUMN OLD
    SQL
  end

  
end
