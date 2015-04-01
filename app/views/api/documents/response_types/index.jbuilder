json.array! @types do |type|
  json.id   type.id
  if type.category == Document::ResponseType::COMPLETE
    json.html_name "<span class=\"text-success\"><i class=\"fa fa-check\"></i> #{type.name}</span>"
  elsif type.category == Document::ResponseType::CANCEL
    json.html_name "<span class=\"text-danger\"><i class=\"fa fa-times\"></i> #{type.name}</span>"
  else
    json.html_name type.name
  end
  json.category type.category
  json.name type.name
end
