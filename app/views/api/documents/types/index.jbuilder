json.array! @types do |type|
  json.id         type.id
  json.name       type.name
  json.order_by   type.order_by
end
