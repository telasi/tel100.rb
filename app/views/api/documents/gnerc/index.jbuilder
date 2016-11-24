if @gnerc
	json.document_id @gnerc.document_id
	json.type_id @gnerc.type_id
	if @gnerc.file
		json.name @gnerc.file.original_name
	else
		json.name ''
	end
	json.created_at @gnerc.created_at
end
