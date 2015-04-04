json.array! @folders do |folder|
  json.id         folder[:folder_type]
  json.name       folder[:name]
  json.icon       folder[:icon]
  json.count      folder[:count]
  json.parent_id  folder[:parent_id]
end