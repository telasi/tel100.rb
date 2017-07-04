class Sys::UserRole < ActiveRecord::Base
  self.table_name  = 'user_roles'
  self.set_integer_columns :category

  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  belongs_to :role, class_name: 'Sys::Role', foreign_key: 'role_id'
end