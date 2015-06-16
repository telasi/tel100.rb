json.array! @changes do |change|
  json.id           change.id
  json.document_id  change.document_id
  json.name         change.user.full_name
  json.created_at_f change.created_at.localtime.strftime '%d-%b-%Y %H:%M'
end
