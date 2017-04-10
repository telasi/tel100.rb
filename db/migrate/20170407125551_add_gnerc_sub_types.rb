class AddGnercSubTypes < ActiveRecord::Migration
  def up
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (23, 'ახალი მიერთება ურთიერთშეთანხმებით (სამუშაოების მოთხოვნით/ტექნიკური პირობის საფუძველზე)', 'ახალი მიერთება ურთიერთშეთანხმებით (სამუშაოების მოთხოვნით/ტექნიკური პირობის საფუძველზე)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (24, 'ქსელზე შეჭრისა და აღრიცხვის კვანძის მოწყობის მოთხოვნა', 'ქსელზე შეჭრისა და აღრიცხვის კვანძის მოწყობის მოთხოვნა')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (25, 'სიმძლავრის გაზრდა (მოხმარების დასაშვები მოცულობის გაზრდა)', 'სიმძლავრის გაზრდა (მოხმარების დასაშვები მოცულობის გაზრდა)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (26, 'დროებითი მიერთება გამ. ქსელზე (დროებითი სამშენებლო და სხვა სამუშაოები)', 'დროებითი მიერთება გამ. ქსელზე (დროებითი სამშენებლო და სხვა სამუშაოები)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (27, 'აბონენტის გაყოფა (უძრავი ქონების გაყოფის შემთხვევაში)', 'აბონენტის გაყოფა (უძრავი ქონების გაყოფის შემთხვევაში)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (28, 'ქვეაბონენტად აყვანა (დროებითი აბონენტი)', 'ქვეაბონენტად აყვანა (დროებითი აბონენტი)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (29, 'გამ.ქსელის გადატანა-რეკონსტრუქცია', 'გამ.ქსელის გადატანა-რეკონსტრუქცია')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (30, 'აღ. კვანძის მოწესრიგება (მ.შ. მრიცხველის შეცვლა, დალუქვა, ლუქის დაზიანება და მრიცხველის სხვა დაზიანება)', 'აღ. კვანძის მოწესრიგება (მ.შ. მრიცხველის შეცვლა, დალუქვა, ლუქის დაზიანება და მრიცხველის სხვა დაზიანება)')
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE_GNERC_SUBTYPE(ID, NAME_KA, NAME_RU) 
      VALUES (31, 'მომხმარებლის წერილი/განცხადება/საჩივარი - სხვა', 'მომხმარებლის წერილი/განცხადება/საჩივარი - სხვა')
    SQL
  end

  def down
  end
end
