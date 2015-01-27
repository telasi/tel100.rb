json.id motion.id
json.parent_id motion.parent_id
json.document_id motion.document_id
json.status motion.status
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
json.updated_at motion.updated_at