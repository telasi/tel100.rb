class HR::Vacation::Defaults < ActiveRecord::Base
    self.table_name  = 'hr_vacation_defaults'
    self.sequence_name = 'hr_vacation_defaults_seq'

    POSSITION_HEAD_OF_GROUP = 'head_of_group'
    POSSITION_HEAD_OF_DIVISION = 'head_of_division'
    POSSITION_DIRECTOR = 'director'
    POSSITION_HEAD_OF_HR = 'head_of_hr'

    POSITIONS = [POSSITION_HEAD_OF_GROUP, POSSITION_HEAD_OF_DIVISION, POSSITION_DIRECTOR, POSSITION_HEAD_OF_HR]

    belongs_to :user, class_name: 'Sys::User'

    def person_name
        person = HR::Employee.find(self.value)
        person.to_s if person.present?
    end

    def self.populate(params, user)
        HR::Vacation::Defaults.transaction do 
            HR::Vacation::Defaults.where(user: user).destroy_all
            POSITIONS.each do |pos|
                if params.include?(pos) && params[pos].present?
                    HR::Vacation::Defaults.create!(user: user, key: pos, value: params[pos])
                end
            end
        end
    end
end