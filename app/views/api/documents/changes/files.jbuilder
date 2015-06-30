json.array! @files do |file|
  json.id file.id
  json.document_id file.document_id
  json.name file.original_name
  json.created_at file.created_at
end
