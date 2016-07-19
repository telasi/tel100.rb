class AddCustomerDocumentTypes < ActiveRecord::Migration
  def up
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('მომხმარებელთა წერილი', 'Письмо пользователя', 13)
    SQL
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('აღრიცხვის ხელსაწყოების შემოწმება', 'Проверка устройств учета', 14)
    SQL
  end

  def down
  end
end
