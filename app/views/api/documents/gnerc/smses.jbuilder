json.array! @smses do |item|
  json.base_id 		item.base_id
  json.answer_id 	item.answer_id
  json.send 		item.send
  json.text			item.text
  json.created_at   item.created_at
end
