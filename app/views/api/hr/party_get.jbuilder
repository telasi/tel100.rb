json.array! @party do |part|
	json.id			  part.id
	json.name_ka      part.name_ka
	json.address_ka   part.address_ka
	json.contact_ka   part.contact_ka
	json.name_ru      part.name_ru
	json.address_ru   part.address_ru
	json.contact_ru   part.contact_ru
	json.name_en      part.name_en
	json.address_en   part.address_en
	json.contact_en   part.contact_en
	json.identity     part.identity
	json.phones       part.phones
	json.email        part.email
	json.customer     part.customer
end