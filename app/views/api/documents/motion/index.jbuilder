json.array! @motions do |motion|
  json.partial! 'api/documents/motion/motion' , motion: motion
end
