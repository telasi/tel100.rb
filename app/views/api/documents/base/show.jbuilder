doc = @my_doc.document

json.partial! 'api/documents/base/mydoc' , mydoc: @my_doc
json.is_editable doc.is_editable?
json.has_history doc.has_history?
json.body doc.body