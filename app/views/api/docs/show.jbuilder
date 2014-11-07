json.(@document,
  :id, :language, :parent_id, :type_id, :direction, :subject, :original_number, :docnumber, :docdate, :docyear,
  :page_count, :additions_count, :due_date, :alarm_date, :status, :body, :owner_user_id, :owner_id, :owner_type
)

json.body @document.body

if @document.sender_user
	json.sender_user(@document.sender_user, :id, :full_name)
end

if @document.owner_user
	json.owner_user(@document.owner_user, :id, :full_name)
end

json.authors @document.authors do |auth|
  json.full_name auth.author.full_name
end