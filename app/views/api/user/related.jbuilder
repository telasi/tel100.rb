json.array! @relations do |rel|
  user = rel.related
  json.id          user.id
  json.role        rel.role
  json.email       user.email
  json.mobile      user.mobile
  json.phone       user.phone
  json.username    user.username
  json.first_name  user.first_name
  json.last_name   user.last_name
end