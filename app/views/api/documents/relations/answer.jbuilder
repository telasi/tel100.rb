json.array! @relations do |relation|
  doc = relation.base
  owner = doc.owner || doc.owner_user
  json.id        relation.id
  json.docid     doc.id
  json.docnumber doc.docnumber
  json.doctype   doc.type.name
  json.status    doc.status
  json.subject 	 doc.subject
  json.owner     owner.full_name
  if @user == doc.owner_user 
  	json.is_owner   1
  end
end
