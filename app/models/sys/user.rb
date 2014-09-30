# -*- encoding : utf-8 -*-
require 'bcrypt'

class Sys::User < ActiveRecord::Base
  include BCrypt
  self.table_name  = 'users'
  self.set_integer_columns :is_active

  def password
    @password ||= Password.new(self.password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.active; Sys::User.where(is_active: 1) end

  def self.register(params)
    password = params.delete(:password)
    user = Sys::User.new(params)
    user.password = password
    user.save
    user
  end

  def self.authenticate(userID, password)
    user = Sys::User.find_by_username(userID)
    user if (user and user.password == password)
  end
end
