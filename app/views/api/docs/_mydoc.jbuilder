# XXX: this template is not used
# document::user properties
json.my_status   mydoc.status
json.my_role     mydoc.role
json.is_new      mydoc.new?
json.is_changed  mydoc.changed?

# document::base properties
doc = mydoc.document
json.id          doc.id
json.language    doc.language
json.parent_id   doc.parent_id
json.type_id     doc.type_id ## XXX remove!!!
json.type do
  json.id   doc.type_id
  json.name doc.type.name
end
json.direction   doc.direction
json.subject     doc.subject
json.original_number doc.original_number
json.original_date   doc.original_date
json.docnumber   doc.docnumber
json.docdate     doc.docdate
json.docyear     doc.docyear
json.page_count  doc.page_count
json.additions_count doc.additions_count
json.due_date    doc.due_date
json.alarm_date  doc.alarm_date
json.status      doc.status
json.sender_user_id doc.sender_user_id
json.sender_id   doc.sender_id
json.sender_type doc.sender_type
json.owner_user_id doc.owner_user_id
json.owner_id    doc.owner_id
json.owner_type  doc.owner_type
json.created_at  doc.created_at
json.updated_at  doc.updated_at
json.statuses [
  doc.motions_completed,
  doc.motions_canceled,
  doc.motions_waiting,
  doc.motions_total,
  doc.comments_total
]

# რამდენი შესრულდა / არ შესრულდა HTML-ის სახით
json.statuses_html document_statuses_html(doc)