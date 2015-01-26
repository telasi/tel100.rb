json.id motion.id
json.parent_id motion.parent_id
json.document_id motion.document_id
json.status motion.status
json.due_date motion.due_date
json.ordering motion.ordering
json.motion_text motion.motion_text
sender = motion.sender
sender_user = motion.sender_user
if sender_user
  json.sender_user do
    json.id sender_user.id
    json.username sender_user.username
  end
end
if sender
  # json.sender sender.to_json
  # TODO: sender JSON
end