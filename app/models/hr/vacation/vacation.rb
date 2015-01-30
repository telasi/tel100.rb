# -*- encoding : utf-8 -*-
class HR::Vacation::Vacation < ActiveRecord::Base
  self.table_name  = 'hr_vacation'
  self.sequence_name = 'hr_vacation_seq'

  validate :correct_dates
  validate  :date_not_intersect

  def correct_dates
  	errors.add('Error in dates') if to_date < from_date
  end

  def date_not_intersect
  	errors.add('Date intersect') if HR::Vacation::Vacation.where("to_date > ? and from_date < ?", self.from_date, self.to_date ).first
  end

  def new
  	self.userid = current_user
  end
end
