json.cache! ['v1', @my_docs], expires_in: 10.minutes do
  json.data do
    json.array! @my_docs do |mydoc|
      json.partial! 'api/documents/base/mydoc' , mydoc: mydoc
    end
  end
  json.total	@total
end