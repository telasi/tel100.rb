doc = @my_doc.document
user = @my_doc.user

json.partial! 'api/documents/base/mydoc' , mydoc: @my_doc
json.is_editable doc.is_editable?(user)
json.has_history doc.has_history?
json.body doc.body