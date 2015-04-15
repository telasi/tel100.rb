json.array! @motions do |motion|
  json.id     motion.id
  json.status motion.status
  json.name   motion.receiver.to_s
end