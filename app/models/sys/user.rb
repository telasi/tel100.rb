# -*- encoding : utf-8 -*-
require 'bcrypt'

class Sys::User < ActiveRecord::Base
  include BCrypt
  include CamelizedModel
  self.table_name  = 'users'
  self.set_integer_columns :is_active, :is_admin
  self.localized_fields('first_name', 'last_name')
  belongs_to :employee, class_name: 'HR::Employee'
  before_create :on_before_create
  before_save :on_before_save

  validates :username, uniqueness: { message: 'ეს მომხმარებელის სახელი დაკავებულია' }
  validates :username, presence: { message: 'ჩაწერეთ მოხმარებლის სახელი' }
  validates :mobile, mobile: { message: 'არასწორი მობილურის ნომერი' }
  validates :email, email: { message: 'არასწორი ელ.ფოსტა' }
  validates :username, username: { message: 'არასწორი მომხმარებლის სახელი' }

  def full_name; "#{self.first_name} #{self.last_name}" end
  def active?; self.is_active == 1 end
  def admin?; self.is_admin == 1 end
  def mobile_formatted; KA.format_mobile(self.mobile) if self.mobile.present? end

  def virtual_password; @virtual_password end
  def virtual_password=(password)
    @virtual_password = password
    self.password = password
  end

  def password; @password ||= Password.new(self.password_hash) end
  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.active; Sys::User.where(is_active: 1) end

  def self.authenticate(userID, password)
    user = Sys::User.find_by_username(userID)
    user if (user and user.password == password)
  end

  private

  def on_before_create
    # first user is admin
    self.is_admin = 1 if Sys::User.count == 0
    # user is active
    self.is_active = 1
  end

  def on_before_save
    self.username = self.username.downcase.strip
    self.email = self.email.downcase.strip if self.email.present?

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
