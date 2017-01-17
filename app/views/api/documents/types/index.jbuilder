json.array! @types do |type|
  json.id         type.id
  json.name       type.name
  json.is_special type.special?
  json.is_gnerc   type.gnerc?
  json.deadline   type.deadline
  json.order_by   type.order_by
end
