json.array! @relations do |relation|
  doc = relation.related
  json.id        doc.id
  json.docnumber doc.docnumber
  json.status    doc.status 
  json.owner     doc.owner.to_s
end
