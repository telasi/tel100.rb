json.array! @folders do |folder|
  json.id         folder.folder_type
  json.name       folder.name
  json.category   'a'
end