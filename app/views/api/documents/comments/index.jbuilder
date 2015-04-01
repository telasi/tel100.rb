json.array! @comments do |comment|
  json.id comment.id
  json.user_id comment.user_id
  json.user comment.user.full_name
  json.status comment.status
  json.old_status comment.old_status
  json.role comment.role
  json.text comment.text
  json.created_at comment.created_at
end
