# -*- encoding : utf-8 -*-
class Sys::Sendmail < ActionMailer::Base
	default from: 'support@telasi.ge'

	def send(params)
		mail(params).deliver
	end
end