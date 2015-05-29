class Eflow::User < ActiveRecord::Base
  establish_connection "eflow"
  self.table_name = "users"
end
