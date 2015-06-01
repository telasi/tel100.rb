class Eflow::Motion < ActiveRecord::Base
  establish_connection :eflow
  self.table_name = 'eflow.docs_motions'
  self.primary_key = 'motion_id'
  belongs_to :document, class_name: 'Eflow::Document', foreign_key: 'document_id'
end
