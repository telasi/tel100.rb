json.array! @relations do |relation|
  doc = relation.base
  json.id        relation.id
  json.docid     doc.id
  json.docnumber doc.docnumber
  json.doctype   doc.type.name
  json.status    doc.status
end
