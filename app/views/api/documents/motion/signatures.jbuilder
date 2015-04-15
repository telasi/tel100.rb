json.array! @motions do |motion|
  json.id     motion.id
  json.status motion.status
  json.name   motion.receiver.to_s
  json.date motion.completed_at.strftime('%d-%b-%Y %H:%M') if motion.completed_at.present?
end