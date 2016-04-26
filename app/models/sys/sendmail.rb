# -*- encoding : utf-8 -*-
class Sys::Sendmail < ActionMailer::Base
	default from: 'teldoc@telasi.ge'

	def generate_message(address)
	 message = <<MESSAGE_END
		From: TelDoc <teldoc@telasi.ge>
	    To: #{address}
		MIME-Version: 1.0
		Content-type: text/html
		Subject: You got document in TelDoc system
MESSAGE_END
	end

	def messagesend(address)
		mail(to: address, subject: "You got document in TelDoc system", body: "Test")
		#return if not address
		#Net::SMTP.start('92.241.77.33') do |smtp|
		#  smtp.send_message generate_message(address), 'teldoc@telasi.ge', address
		#end
	end
end