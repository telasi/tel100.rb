json.root do
	json.children do
		json.array! 
			[
			json.name		"Резолюции"
			json.children
				json.name		"Резолюции"
				json.operation  "resolution_by_user"
			end,
			json.name		"Резолюции2"
			json.children
				json.name		"Резолюции2"
				json.operation  "resolution_by_doc"
			end ]
		end
	end
end