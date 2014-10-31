json.(@document, :id, :language, :parent_id, :type_id, :direction, :subject, :original_number, :docnumber, :docdate, :docyear, 
				 :page_count, :additions_count, :due_date, :alarm_date, :status, 
       			 :sender_user_id, :sender_id, :sender_type, :owner_user_id, :owner_id, :owner_type)
if @document.author_user
	json.author_user(@document.author_user, :id, :full_name)
end
if @document.sender_user
	json.sender_user(@document.sender_user, :id, :full_name)
end


json.set! :motions_tree, @motions_tree