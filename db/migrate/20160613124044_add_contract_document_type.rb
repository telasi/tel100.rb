class AddContractDocumentType < ActiveRecord::Migration
def up
    execute <<-SQL
      insert into DOCUMENT_TYPE(NAME_KA, NAME_RU, ORDER_BY) VALUES ('ხელშეკრულება', 'Договор', 12)
    SQL
  end

  def down
  end
end
