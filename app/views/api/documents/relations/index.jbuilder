json.array! @relations do |relation|
  json.id         relation.id
  json.base_id    relation.base_id
  json.related_id relation.related_id
  json.related_type relation.related_type

  doc = relation.related
  if doc.is_a?(Document::Base)
    owner = doc.owner || doc.owner_user
    json.docnumber 	doc.docnumber
    json.status    	doc.status
    json.owner     	owner.full_name
    json.subject    doc.subject
    json.ext_type   'document.Base'
  elsif doc.is_a?(Eflow::Motion)
    document = doc.document
    json.motion_id   doc.motion_id
    json.document_id document.document_id
    json.name        document.document_name
    json.note        document.document_note
    json.type        document.document_subtype_name
    json.number      document.document_no
    json.number2     document.document_no2
    json.ext_type   'eflow.Motion'
  end
end
