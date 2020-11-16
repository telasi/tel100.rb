if @my_doc.present?
  doc = @my_doc.document
  user = @my_doc.user
  json.partial! 'api/documents/base/mydoc' , mydoc: @my_doc
  json.is_editable doc.is_editable?(user)
  json.has_history doc.has_history?
  if @change.present?
    json.subject @change.subject
    json.body    Document::History::Text.where(document_id: doc.id, change_no: @change.id).first.body
  else
    json.body doc.body
  end
  json.is_mydoc true
else
  json.partial! 'api/documents/base/doc' , doc: @doc
  json.is_editable false
  json.has_history @doc.has_history?
  json.body @doc.body
  json.is_mydoc false
end