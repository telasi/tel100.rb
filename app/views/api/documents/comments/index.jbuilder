json.array! @comments do |comment|
  json.id comment.id
  json.user_id comment.user_id
  json.user comment.user.full_name
  if comment.actual_user.present?
    json.actual_user_id comment.actual_user.id
    json.actual_user comment.actual_user.full_name
  end
  if comment.receiver_user.present?
    json.receiver_user_id comment.receiver_user_id
    json.receiver_user comment.receiver_user.full_name
  end
  json.status comment.status
  json.old_status comment.old_status
  json.role comment.role
  json.text comment.text
  json.created_at comment.created_at
end
