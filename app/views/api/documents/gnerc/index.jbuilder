if @gnerc
	json.document_id @gnerc.document_id
	json.type_id @gnerc.type_id
	if @gnerc.file
		json.name @gnerc.file.original_name
	else
		json.name ''
	end
	json.status @gnerc.status
	json.step @gnerc.step
	json.send_status @gnerc.send_status
	json.mediate @gnerc.mediate
	json.created_at @gnerc.created_at
	#if @gnerc.customer_accnumb.present?
		json.customer do
			json.customer_accnumb 	@gnerc.customer_accnumb
			json.customer_name 		@gnerc.customer_name
			json.customer_phone		@gnerc.customer_phone
			json.customer_email		@gnerc.customer_email
			if @gnerc.customer_phone.blank? || @gnerc.customer_phone.upcase.include?('OFF')
			  json.correct_mobile	false
			else
			  json.correct_mobile 	Mobile.correct_mobile?(@gnerc.customer_phone)
			end
		end
	#end
else
 json.status 1
end
