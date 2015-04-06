doc = mydoc.document
user = mydoc.user

# ids
json.id       doc.id
json.user_id  mydoc.user.id
# document::user properties
json.is_new       mydoc.new?
json.is_changed   mydoc.changed?
json.is_sent      mydoc.sent?
json.is_received  mydoc.received?
json.is_forwarded mydoc.forwarded?
json.is_current   mydoc.current?
json.is_canceled  mydoc.canceled?
json.is_completed mydoc.completed?
json.as_owner     mydoc.as_owner
json.as_assignee  mydoc.as_assignee
json.as_signee    mydoc.as_signee
json.as_author    mydoc.as_author
# document::base properties
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
json.sender_name doc.sender_name
json.owner_user_id doc.owner_user_id
json.owner_id    doc.owner_id
json.owner_type  doc.owner_type
json.created_at  doc.created_at
json.updated_at  doc.updated_at