json.array! @substitudes do |sub|
  json.id         			sub.id
  json.userid 				sub.userid
  json.substitude_type      sub.substitude_type
  
  user = sub.user
  json.first_name			user.first_name
  json.last_name			user.last_name
end