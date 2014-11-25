json.array! @my_docs do |mydoc|
  json.partial! 'api/docs/mydoc' , mydoc: mydoc
end
