json.(@document,
  :id, :language, :parent_id, :type_id, :direction, :subject, :original_number, :docnumber, :docdate, :docyear,
  :page_count, :additions_count, :due_date, :alarm_date, :status, :body, :owner_user_id, :owner_id, :owner_type
)

json.body @document.body

if @document.sender
	json.sender_user do
		json.name 			@document.sender.full_name
		json.is_manager 	@document.sender.organization.is_manager
  		json.organization 	@document.sender.organization.name
  		json.image 			@document.sender.icon
	end
end

if @document.owner
	json.owner_user do
		json.name 			@document.owner.full_name
		json.is_manager 	@document.owner.organization.is_manager
  		json.organization 	@document.owner.organization.name
  		json.image 			@document.owner.icon
	end
end

json.authors @document.authors do |auth|
  json.name 			auth.author.full_name
  json.is_manager 		auth.author.organization.is_manager
  json.organization 	auth.author.organization.name
  json.image 			auth.author.icon
end