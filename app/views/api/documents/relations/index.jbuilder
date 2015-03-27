json.array! @relations do |relation|
  doc = relation.related
  json.id        relation.id
  json.docnumber doc.docnumber
  json.status    doc.status
  json.owner     doc.owner.full_name
end
