class AddProtocolDocumentType < ActiveRecord::Migration
  def up
    execute <<-SQL
      insert into DOCUMENT_TYPE(ID, NAME_KA, NAME_RU, ORDER_BY) VALUES (19, 'პროტოკოლი', 'Протоколы', 19)
    SQL
  end

  def down
  end
end
