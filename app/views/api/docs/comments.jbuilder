json.array! @comments do |comment|
  json.id        comment.id
  json.user_id   comment.user_id
  json.full_name comment.user.full_name
  json.status    comment.status
  json.operation comment.operation
  json.text      comment.text
  json.created_at comment.created_at
end
