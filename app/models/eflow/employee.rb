class Eflow::Employee < ActiveRecord::Base
  establish_connection :eflow
  self.table_name = 'eflow.hr_employees'
  self.primary_key = 'employee_id'
end
