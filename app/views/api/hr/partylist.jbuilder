json.data do
	json.array! @party do |part|
	  json.id			part.id
	  json.name_ka      part.name_ka
	  json.address_ka   part.address_ka
	  json.contact_ka   part.contact_ka
	  json.identity     part.identity
	  json.phones       part.phones
	  json.email        part.email
	  json.ext_type     'hr.Party'
	end
end
json.total	@total