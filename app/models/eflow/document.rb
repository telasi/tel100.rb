class Eflow::Document < ActiveRecord::Base
  establish_connection :eflow
  self.table_name = 'eflow.docs_documents'
  self.primary_key = 'document_id'
end
