# -*- encoding : utf-8 -*-
require 'bcrypt'

class Sys::User < ActiveRecord::Base
  include BCrypt
  self.table_name  = 'users'
  self.set_integer_columns :is_active, :is_admin, :is_director, :need_refresh
  self.localized_fields('first_name', 'last_name')
  belongs_to :employee, class_name: 'HR::Employee'
  has_many :documents, class_name: 'Document::User', foreign_key: 'user_id'
  has_many :relations, class_name: 'Sys::UserRelation', foreign_key: 'user_id'
  has_many :related_on, class_name: 'Sys::UserRelation', foreign_key: 'related_id'
  has_one :settings, class_name: 'Sys::UserSetting', foreign_key: 'user_id'

  validates :username, uniqueness: { message: 'ეს მომხმარებელის სახელი დაკავებულია' }
  validates :username, presence: { message: 'ჩაწერეთ მოხმარებლის სახელი' }
  validates :mobile, mobile: { message: 'არასწორი მობილურის ნომერი' }
  validates :email, email: { message: 'არასწორი ელ.ფოსტა' }
  validates :username, username: { message: 'არასწორი მომხმარებლის სახელი' }

  before_create :on_before_create
  before_save :on_before_save

  def settings
    super || Sys::UserSetting.upsert!(self)
  end

  def need_refresh?; self.need_refresh == 1 end
  def notify!; self.update_columns(need_refresh: 1) end
  def denotify!; self.update_columns(need_refresh: 0) end

  def full_name; "#{self.first_name} #{self.last_name}" end
  def to_s; self.full_name end
  def active?; self.is_active == 1 end
  def admin?; self.is_admin == 1 end
  def director?; self.is_director == 1 end
  def mobile_formatted; KA.format_mobile(self.mobile) if self.mobile.present? end

  def virtual_password; @virtual_password end
  def virtual_password=(password)
    @virtual_password = password
    self.password = password
  end

  def password; @password ||= Password.new(self.password_hash) end
  def password=(new_password)
    @password = Password.create(new_password.downcase)
    self.password_hash = @password
  end

  def current_substitude; @current_substitude end
  def current_substitude=(current_substitude)
    @current_substitude = current_substitude
  end

  def create_user
    Sys::User.transaction do
      self.save!
      empl = self.employee
      empl.update_attributes!(user_id: self.id) if empl
      return true
    end
  end

  def update_user(user_params)
    begin
      Sys::User.transaction do
        self.update_attributes!(user_params)
        empl = self.employee
        empl.update_attributes!(user_id: self.id) if empl
        return true
      end
    rescue
      return false
    end
  end

  def self.active; Sys::User.where(is_active: 1) end

  def self.authenticate(userID, password)
    if userID.present? and password.present?
      user = Sys::User.find_by_username(userID.downcase)
      user = Sys::User.find_by_eflow_user_name(userID.downcase) if user.blank?
      user = Sys::User.find_by_email(userID.downcase) if user.blank?
      user = Sys::User.find_by_mobile(userID.downcase) if user.blank?
      user if (user and user.password == password.downcase)
    end
  end

  def to_html
    if self.employee
      self.employee.to_html
    else
      phone = "<code><i class=\"fa fa-phone\"></i> #{self.phone}</code> " if self.phone.present?
      "#{phone} #{full_name}"
    end
  end

  def eflow_users
    Eflow::User.where(user_name: self.eflow_user_name.upcase)
  end

  def eflow_motions
    employee_ids = self.eflow_users.map{|x| x.employee_id}
    Eflow::Motion.where("target_id IN (?) AND motion_state_id IN (?)", employee_ids, Eflow::MotionStatus::RECEIVER_STATS)
  end

  def sync_with_eflow
    if self.employee.present?
      person_id = self.employee.person_id
      eflow_user = Eflow::User.where(employee_id: person_id).first
      eflow_user = Eflow::User.where(user_name: "#{self.employee.last_name.to_lat}.#{self.employee.first_name.to_lat}".upcase).first if eflow_user.blank?
      if eflow_user.present?
        self.eflow_user_name = eflow_user.user_name
        self.save
      end
    end
  end

  # Migrate EFLOW users into our structure
  def self.migrate_eflow
    Eflow::Employee.where(employee_state_id: 1).each do |eempl|
      euser = Eflow::User.where(employee_id: eempl.employee_id).first
      if euser.present?
        person_id = eempl.position_id
        empl = HR::Employee.where(person_id: person_id, is_active: 1).first
        if empl.present?
          e_username = euser.user_name.split('.')
          email = "#{e_username[1]}.#{e_username[0]}@telasi.ge".downcase
          username = e_username.join('.').downcase
          password = euser.password.downcase
          if Sys::User.where(username: username).empty?
            user = Sys::User.create(email: email, mobile: '555123456', phone: '7123', username: username,
              email_confirmed: 0, mobile_confirmed: 0, is_active: 1, is_admin: 0,
              employee: empl, person_id: person_id, first_name_ka: empl.first_name_ka,
              first_name_ru: empl.first_name_ru, last_name_ka: empl.last_name_ka,
              last_name_ru: empl.last_name_ru, virtual_password: password,
              eflow_user_name: username)
            empl.update_attributes(user_id: user.id)
          end
        end
      end
    end
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
      self.person_id     = self.employee.person_id
      self.first_name_ka = self.employee.first_name_ka
      self.first_name_ru = self.employee.first_name_ru
      self.first_name_en = self.employee.first_name_en
      self.last_name_ka  = self.employee.last_name_ka
      self.last_name_ru  = self.employee.last_name_ru
      self.last_name_en  = self.employee.last_name_en
    end
  end
end
