json.array! @types do |type|
  json.id   type.id
  json.role type.role
  json.direction type.direction
  json.ordering type.ordering
  json.name type.name
  if type.positive?
    json.html_name "<span class=\"text-success\"><i class=\"fa fa-check\"></i> #{type.name}</span>"
  elsif type.negative?
    json.html_name "<span class=\"text-danger\"><i class=\"fa fa-times\"></i> #{type.name}</span>"
  else
    json.html_name type.name
  end
end
