# -*- encoding : utf-8 -*-
class HR::Vacation::Vacation < ActiveRecord::Base
  self.table_name  = 'hr_vacation'
  self.sequence_name = 'hr_vacation_seq'
  self.set_integer_columns :substitude_type, :confirmed
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'userid'

  validate :correct_dates
  validate :date_not_intersect

  def self.confirmed; HR::Vacation::Vacation.where(confirmed: 1) end

  def correct_dates
  	errors.add(:to_date, 'Error in dates') if to_date < from_date
  end

  def date_not_intersect
  	errors.add(:to_date, 'Date intersection') if HR::Vacation::Vacation.where("userid = ? and to_date > ? and from_date < ?", self.userid, self.from_date, self.to_date ).first
  end

  def self.get_substitudes(user)
  	HR::Vacation::Vacation.confirmed.where("from_date <= sysdate and to_date >= sysdate and substitude = ?", user.id)
  end
end