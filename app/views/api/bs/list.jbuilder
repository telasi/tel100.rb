json.data do
	json.array! @customers do |customer|
	  json.id		    customer.custkey
	  json.custkey		customer.custkey
	  json.name         customer.name
	  json.address      customer.address
	  json.taxid        customer.taxid
	  json.accnumb      customer.accnumb
	  json.fax	      	customer.fax
	  json.ext_type     'bs.Customer'
	end
end
json.total	@total