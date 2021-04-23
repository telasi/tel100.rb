# -*- encoding : utf-8 -*-
module Party::Synchronizer
    def self.actualize_favourites
        Party::Favourites.where(person_type: 'HR::Employee'). map do |fav|
            person = HR::Employee.find(fav.person_id)
            if person.present?
                fav.delete unless (person.is_active == 1 && person.employee_status_id > 0)
            end
        end
    end
end