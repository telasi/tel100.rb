json.array! @relations do |relation|
  doc = relation.related
  owner = doc.owner || doc.owner_user
  json.id        relation.id
  json.docnumber doc.docnumber
  json.status    doc.status
  json.owner     owner.full_name
end
