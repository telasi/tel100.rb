json.array! @types do |type|
  json.id         type.id
  json.name       type.name
  json.order_by   type.order_by
  json.created_at type.created_at
  json.updated_at type.updated_at
end
