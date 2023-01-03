class HR::Vacation::Calendar < ActiveRecord::Base
    self.table_name  = 'hr_vacation_calendar'
    self.sequence_name = 'hr_vac_cal_seq'

    def self.allowed_to_go(employee_id, from_date, to_date)
        if (to_date - from_date).to_i > 10
            HR::Vacation::Calendar.where(hrid: employee_id, fromdate: from_date, todate: to_date).any?
        else 
            true
        end
    end
end