json.array! @motions do |motion|
  json.id         motion.motion_id
  json.document do
    doc = motion.document
    json.id     doc.document_id
    json.name   doc.document_name
    json.note   doc.document_note
    json.type   doc.document_subtype_name
  end
end