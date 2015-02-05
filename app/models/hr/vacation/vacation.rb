# -*- encoding : utf-8 -*-
class HR::Vacation::Vacation < ActiveRecord::Base
  self.table_name  = 'hr_vacation'

  validate :correct_dates
  validate :date_not_intersect

  def correct_dates
  	errors.add(:to_date, 'Error in dates') if to_date < from_date
  end

  def date_not_intersect
  	errors.add(:to_date, 'Date intersection') if HR::Vacation::Vacation.where("to_date > ? and from_date < ?", self.from_date, self.to_date ).first
  end
end