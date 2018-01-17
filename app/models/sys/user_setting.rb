class Sys::UserSetting < ActiveRecord::Base
  self.table_name  = 'user_settings'
  self.set_integer_columns :notif_mail, :notif_sms

  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def self.upsert!(user)
  	Sys::UserSetting.where(user: user).first || Sys::UserSetting.create!(user: user)
  end
end