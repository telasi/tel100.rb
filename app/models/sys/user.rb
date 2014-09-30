# -*- encoding : utf-8 -*-
require 'bcrypt'

class Sys::User < ActiveRecord::Base
  include BCrypt
  self.table_name  = 'users'
  self.set_integer_columns :is_active
  self.localized_fields('first_name', 'last_name')
  belongs_to :employee, class_name: 'HR::Employee'
  before_save :on_before_save

  validates :username, uniqueness: { message: 'ეს მომხმარებელის სახელი დაკავებულია' }, presence: { message: 'ჩაწერეთ მოხმარებლის სახელი' }

  def full_name; "#{self.first_name} #{self.last_name}" end
  def password; @password ||= Password.new(self.password_hash) end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.active; Sys::User.where(is_active: 1) end

  # def self.register(params)
  #   password = params.delete(:password)
  #   user = Sys::User.new(params)
  #   user.password = password
  #   user.save
  #   user
  # end

  def self.authenticate(userID, password)
    user = Sys::User.find_by_username(userID)
    user if (user and user.password == password)
  end

  private

  def on_before_save
    if self.employee
      self.person_id = self.employee.person_id
      self.first_name_ka = self.employee.first_name_ka
      self.first_name_ru = self.employee.first_name_ru
      self.first_name_en = self.employee.first_name_en
      self.last_name_ka = self.employee.last_name_ka
      self.last_name_ru = self.employee.last_name_ru
      self.last_name_en = self.employee.last_name_en
    end
  end
end
