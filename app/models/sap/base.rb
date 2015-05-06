# -*- encoding : utf-8 -*-
module Sap::Base
  @@date = DateTime.now

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
  	def set_date(date)
  		@@date = date
  	end

  	def current
  		@@date ||= DateTime.now
  		self.where('begin_date <= :date and end_date >= :date', date: @@date); end
  	end
end
