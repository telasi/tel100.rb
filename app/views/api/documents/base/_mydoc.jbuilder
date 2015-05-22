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
json.as_sender    mydoc.as_sender
json.as_assignee  mydoc.as_assignee
json.as_signee    mydoc.as_signee
json.as_author    mydoc.as_author
json.has_due_date mydoc.due_date?
json.due_is_over  mydoc.due_is_over?
json.current_due_date mydoc.current_due_date
json.is_editable  mydoc.is_editable?

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
#  json.array! doc.author_motions.where('status IN (?)', stats).order('id ASC') do |motion|
#    json.id        motion.id
#    json.status    motion.status
#    json.author_id motion.receiver_id
#    json.author_type motion.receiver_type
#    json.name      motion.receiver.to_s
#    json.response  motion.response_type.to_s
#    json.completed_at motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
#    if motion.receiver.respond_to?('organization')
#      json.position  motion.receiver.organization.to_s
#    end
#  end
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
    json.id           motion.id
    json.status       motion.status
    json.name         motion.receiver.to_s
    json.signee_id    motion.receiver_id
    json.signee_type  motion.receiver_type
    json.response     motion.response_type.to_s
    json.completed_at motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.position  motion.receiver.organization.to_s if motion.receiver.respond_to?('organization')
  end
end

# assignees
json.assignees do
  json.array! doc.assignee_motions.where('status IN (?)', stats).order('id ASC') do |motion|
    json.id        motion.id
    json.status    motion.status
    json.name      motion.receiver.to_s
    json.assignee_id    motion.receiver_id
    json.assignee_type  motion.receiver_type
    json.response  motion.response_type.to_s
    json.completed_at motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.position  motion.receiver.organization.to_s if motion.receiver.respond_to?('organization')
  end
end

# incoming motions
incoming = mydoc.motions.order('ordering ASC, id ASC') # any status is OK
json.incoming do
  json.array! incoming do |motion|
    json.id           motion.id
    json.status       motion.status
    json.name         motion.sender.to_s
    json.sender_id    motion.sender_id
    json.sender_type  motion.sender_type
    json.current_status motion.current_status.to_s
    json.motion_text  motion.motion_text
    json.due_date     motion.due_date
    json.completed_at motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.role         motion.receiver_role
    json.is_new       motion.new?
  end
end

# outgoing motions
out_stats = [ Document::Status::SENT, Document::Status::CURRENT, Document::Status::NOT_RECEIVED, Document::Status::COMPLETED, Document::Status::CANCELED ]
out_roles = [ Document::Role::ROLE_ASSIGNEE ]
outgoing = mydoc.outgoing.where('status IN (?) AND receiver_role IN (?)', out_stats, out_roles).order('ordering ASC, id DESC') # any status is OK
json.outgoing do
  json.array! outgoing do |motion|
    json.id             motion.id
    json.status         motion.status
    json.name           motion.receiver.to_s
    json.receiver_id    motion.receiver_id
    json.receiver_type  motion.receiver_type
    json.current_status motion.current_status.to_s
    json.response_text  motion.response_text
    json.due_date       motion.due_date
    json.completed_at   motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.role           motion.receiver_role
    json.is_new         motion.new?
  end
end
