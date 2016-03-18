json.id       doc.id

# document::base properties
json.parent_id   doc.parent_id
json.type_id     doc.type_id ## XXX remove!!!
if doc.type_id.present?
  json.type do
    json.id   doc.type_id
    json.name doc.type.name
  end
end
json.direction   doc.direction
json.subject     doc.subject
json.original_number doc.original_number
json.original_date   doc.original_date
json.docnumber   doc.docnumber
json.docnumber2  doc.docnumber2
json.docdate     doc.docdate
json.docyear     doc.docyear
json.page_count  doc.page_count
json.additions   doc.additions
json.due_date    doc.due_date
json.alarm_date  doc.alarm_date
json.status      doc.status

# sender & actual sender
sender = ( doc.sender || doc.sender_user )
json.sender_user_id doc.sender_user_id
json.sender_id   sender.id
json.sender_type sender.class.name
json.sender_name sender.to_s

actual_sender = doc.actual_sender
json.actual_sender do
  json.id actual_sender.id
  json.name actual_sender.to_s
end if actual_sender.present?

# owner
owner = ( doc.owner || doc.owner_user )
json.owner_user_id doc.owner_user_id
json.owner_id    owner.id
json.owner_type  owner.class.name
json.owner_name  owner.to_s
json.is_reply    doc.is_reply?
# dates
json.created_at doc.created_at
json.updated_at doc.updated_at
json.sent_at doc.sent_at
json.received_at doc.received_at
json.completed_at doc.completed_at
json.created_at_f doc.created_at.localtime.strftime '%d-%b-%Y %H:%M'
json.updated_at_f doc.updated_at.localtime.strftime '%d-%b-%Y %H:%M'
json.sent_at_f doc.sent_at.localtime.strftime '%d-%b-%Y %H:%M' if doc.sent_at.present?
json.received_at_f doc.received_at.localtime.strftime '%d-%b-%Y %H:%M' if doc.received_at.present?
json.completed_at_f doc.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if doc.completed_at.present?

## parties in this task

stats = [ Document::Status::SENT, Document::Status::CURRENT, Document::Status::NOT_RECEIVED, Document::Status::COMPLETED, Document::Status::CANCELED ]

# authors
json.authors do
  json.array! doc.authors do |author|
    json.id           author.id
    json.status       ''
    json.author_id    author.id
    json.author_type  author.class.name
    json.name         author.to_s
  end
end

# signees
json.signees do
  json.array! doc.signee_motions.where('status IN (?)', stats).order('id ASC') do |motion|
    receiver = ( motion.receiver || motion.receiver_user )
    json.id           motion.id
    json.status       motion.status
    json.name         receiver.to_s
    json.signee_id    receiver.id
    json.signee_type  receiver.class.name
    json.response     motion.response_type.to_s
    json.completed_at motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.position     motion.receiver.organization.to_s if motion.receiver.respond_to?('organization')
  end
end

json.files do
  json.array! doc.files do |file|
    json.id    file.id
    json.name  file.original_name
  end
end

json.answers do
  json.array! Document::Relation.where(related: doc) do |relation|
    answer = relation.base
    owner = answer.owner || answer.owner_user
    json.docnumber answer.docnumber
    json.owner     owner.full_name
  end
end