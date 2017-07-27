class AddSmsTemplate < ActiveRecord::Migration
  def up
  	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 14, 'სიმძლავრის დადგენა', 'Tqveni #date clis gancxadeba #number dakmayofilebulia, aqti #/________/')
     SQL
  end
end
