def statusify(object, text)
  case object.status
  when Document::Status::COMPLETED
    "<span class=\"text-success\"><i class=\"fa fa-check\"></i> #{text}</span>"
  when Document::Status::CANCELED
    "<span class=\"text-danger\"><i class=\"fa fa-check\"></i> #{text}</span>"
  else
    "<span class=\"text-info\"><i class=\"fa fa-clock-o\"></i> #{text}</span>"
  end
end

if motion.blank?
  json.document_id document.id
  json.type 'document'
  json.status document.status
  sender = document.sender
  sender_user = document.sender_user
  json.sender_user { json.partial! 'api/sys/users/user', user: sender_user } if sender_user
  json.sender { json.partial! 'api/documents/party', party: sender } if sender
  json.due_date document.due_date
  json.motion_text document.subject
  json.created_at document.created_at
  json.updated_at document.updated_at
  text = "##{document.docnumber}: #{document.sender}"
  json.text text
  json.html_text statusify(document, text)
else
  json.id motion.id
  json.type 'motion'
  json.parent_id motion.parent_id
  json.document_id motion.document_id
  json.status motion.status
  json.current_status motion.current_status
  json.is_new motion.is_new
  json.due_date motion.due_date
  json.ordering motion.ordering
  json.motion_text motion.motion_text
  sender = motion.sender
  sender_user = motion.sender_user
  json.sender_user { json.partial! 'api/sys/users/user', user: sender_user } if sender_user
  json.sender { json.partial! 'api/documents/party', party: sender } if sender
  json.response_text motion.response_text
  receiver = motion.receiver
  receiver_user = motion.receiver_user
  json.receiver_user { json.partial! 'api/sys/users/user', user: receiver_user } if receiver_user
  json.receiver { json.partial! 'api/documents/party', party: receiver } if receiver
  json.receiver_role motion.receiver_role
  json.created_at motion.created_at
  json.sent_at motion.sent_at
  json.received_at motion.received_at
  json.completed_at motion.completed_at
  json.updated_at motion.updated_at
  if motion.send_type.present?
    json.send_type_id motion.send_type.id
    json.send_type_name motion.send_type.name
  end
  if motion.response_type.present?
    json.resp_type_id motion.response_type.id
    json.resp_type_name motion.response_type.name
  end
  # text calculation
  text = ''
  if motion.send_type.present?
    if motion.motion_text.present?
      text = "#{sender}: #{motion.send_type.name} - #{motion.motion_text}"
    else
      text = "#{sender}: #{motion.send_type.name}"
    end
  else
    if motion.motion_text.present?
      text = "#{sender}: #{motion.motion_text}"
    else
      text = "#{sender}"
    end
  end
  json.text text
  json.html_text statusify(motion, text)
end