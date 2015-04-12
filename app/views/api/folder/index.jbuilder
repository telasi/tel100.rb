json.array! @folders do |folder|
  json.id          folder.id
  json.name        folder.name
  json.folder_type folder.folder_type
  json.form		   folder.form
end