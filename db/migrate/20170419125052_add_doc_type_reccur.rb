class AddDocTypeReccur < ActiveRecord::Migration
  def up
  	execute <<-SQL
      insert into DOCUMENT_TYPE(ID, NAME_KA, NAME_RU, ALLOW_INNER, ORDER_BY) VALUES (17, 'საკონკურსო დოკუმენტაცია', 'Конкурсная документация', 1, 17)
    SQL
  end
end
