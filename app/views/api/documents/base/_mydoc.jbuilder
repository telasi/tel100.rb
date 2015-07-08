user = mydoc.user
doc = mydoc.document
json.partial! 'api/documents/base/doc' , { doc: doc, user: user }

json.user_id      mydoc.user.id
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

# incoming motions
incoming = mydoc.motions.order('ordering ASC, id ASC') # any status is OK
json.incoming do
  json.array! incoming do |motion|
    sender = ( motion.sender || motion.sender_user )
    json.id             motion.id
    json.sender_user_id motion.sender_user_id
    json.status         motion.status
    json.name           sender.to_s
    json.sender_id      sender.id
    json.sender_type    sender.class.name
    if motion.current_status.blank?
      json.current_status '--'
    else
      json.current_status motion.current_status.to_s
    end
    json.motion_text    motion.motion_text
    json.due_date       motion.due_date
    json.completed_at   motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.role           motion.receiver_role
    json.is_new         motion.new?
    json.actual_sender do
      json.id    motion.actual_sender.id
      json.name  motion.actual_sender.to_s
    end if motion.actual_sender.present?
  end
end

# outgoing motions
out_stats = [ Document::Status::SENT, Document::Status::CURRENT, Document::Status::NOT_RECEIVED, Document::Status::COMPLETED, Document::Status::CANCELED ]
out_roles = [ Document::Role::ROLE_ASSIGNEE ]
outgoing = mydoc.outgoing.where('status IN (?) AND receiver_role IN (?)', out_stats, out_roles).order('ordering ASC, id DESC') # any status is OK
json.outgoing do
  json.array! outgoing do |motion|
    receiver = ( motion.receiver || motion.receiver_user )
    json.id               motion.id
    json.receiver_user_id motion.receiver_user_id
    json.status           motion.status
    json.name             receiver.to_s
    json.receiver_id      receiver.id
    json.receiver_type    receiver.class.name
    if motion.current_status.blank?
      json.current_status '--'
    else
      json.current_status motion.current_status.to_s
    end
    json.response_text    motion.response_text
    json.due_date         motion.due_date
    json.completed_at     motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.role             motion.receiver_role
    json.is_new           motion.new?
    json.last_receiver do
      json.id    motion.last_receiver.id
      json.name  motion.last_receiver.to_s
    end if motion.last_receiver.present?
  end
end

# assignees
stats = [ Document::Status::SENT, Document::Status::CURRENT, Document::Status::NOT_RECEIVED, Document::Status::COMPLETED, Document::Status::CANCELED ]

json.assignees do
  json.array! doc.assignee_motions.where('sender_user_id = ? and status IN (?)', user.id, stats).order('id ASC') do |motion|
    receiver = ( motion.receiver || motion.receiver_user )
    json.id            motion.id
    json.status        motion.status
    json.name          receiver.to_s
    json.assignee_id   receiver.id
    json.assignee_type receiver.class.name
    json.response      motion.response_type.to_s
    json.completed_at  motion.completed_at.localtime.strftime '%d-%b-%Y %H:%M' if motion.completed_at.present?
    json.position      receiver.organization.to_s if receiver.respond_to?('organization')
  end
end
