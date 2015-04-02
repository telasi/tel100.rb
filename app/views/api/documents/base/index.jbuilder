json.data do
	json.array! @my_docs do |mydoc|
	  json.partial! 'api/documents/base/mydoc' , mydoc: mydoc
	end
end
json.total	@total