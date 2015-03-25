json.array! @list do |item|
  json.id         item.id
  json.from_date  item.from_date
  json.to_date    item.to_date

  type = item.type
  json.type_name       type.name

  sub_user = item.sub_user

  json.full_name sub_user
end