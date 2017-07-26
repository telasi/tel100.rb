json.array! @smses do |item|
  json.description 		item[:description] || ''
  json.text 			item[:text]
end
