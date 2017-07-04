class Sys::Role < ActiveRecord::Base
  self.table_name  = 'roles'
  self.set_integer_columns :category

  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def related_users; Sys::UserRole.where(role: self.id) end
end