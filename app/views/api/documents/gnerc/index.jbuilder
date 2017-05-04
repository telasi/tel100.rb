if @gnerc
	json.document_id @gnerc.document_id
	json.type_id @gnerc.type_id
	if @gnerc.file
		json.name @gnerc.file.original_name
	else
		json.name ''
	end
	json.status @gnerc.status
	json.mediate @gnerc.mediate
	json.created_at @gnerc.created_at
end
