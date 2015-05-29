class Eflow::User < ActiveRecord::Base
  establish_connection "eflow"
  self.table_name = "eflow.security_users"
end
