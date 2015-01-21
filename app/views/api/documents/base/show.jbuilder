doc = @my_doc.document

json.partial! 'api/documents/base/mydoc' , mydoc: @my_doc
json.body doc.body