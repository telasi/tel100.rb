# -*- encoding : utf-8 -*-
class BS::Customer < ActiveRecord::Base
  self.table_name  = 'customer'
  self.primary_key = 'custkey'

  def to_s; self.name end

  def to_html
    "<code>#{self.accnumb}</code> #{self.name} (მიმდ.ბალანსი: <code>#{self.balance}</code>GEL)"
  end

  def abonent_type
  	return 1 if [1,1111, 1112, 1113].include?(self.custcatkey)
  	return 2
  end
end
