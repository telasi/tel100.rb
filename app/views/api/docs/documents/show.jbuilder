json.(@document, :id, :language, :parent_id, :type_id, :direction, :subject, :original_number, :docnumber, :docdate, :docyear, 
				 :page_count, :additions_count, :due_date, :alarm_date, :status, 
       			 :sender_user_id, :sender_id, :sender_type, :owner_user_id, :owner_id, :owner_type)
if @document.author_user
	json.(@document.author_user, :id, :full_name)
end
if @document.sender_user
	json.(@document.sender_user, :id, :full_name)
end
json.motions @document.motions do |motion|
	json.(motion, :id, :response_text)
	json.(motion.sender_user, :full_name)
    json.(motion.sender_user.employee.organization, :name)
end 

json.set! :motions_tree, @motions_tree