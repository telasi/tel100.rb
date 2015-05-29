class Eflow::Motion < ActiveRecord::Base
  establish_connection 'eflow'
  self.table_name = 'eflow.docs_motion'
  self.primary_key = 'motion_id'
end
