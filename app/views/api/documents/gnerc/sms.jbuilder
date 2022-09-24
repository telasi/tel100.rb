json.array! @smses do |item|
  json.id 			item.id
  json.base_id 		item.base_id
  json.answer_id 	item.answer_id
  json.user_id 		item.user_id
  json.user 		item.user.full_name
  json.text			item.text
  json.phone 		item.phone
  json.active		item.active
  json.created_at   item.created_at
  json.sent_at   item.sent_at
end
