json.array! @favourites do |favourite|
  json.id          favourite.id
  json.name        favourite.name
  json.person_id   favourite.person_id
  json.person_type favourite.person_type
  if favourite.person_type == 'HR::Employee'
    vac = HR::Vacation::Base.confirmed.current.where(employee_id: favourite.person_id).first
  	if vac 
      sub_empl = vac.sub_employee.id if vac.substitude
      full_name = vac.sub_employee.full_name if vac.substitude
      json.vacation  vac.id
      json.vac_text vac.type.name
      json.sub_id   sub_empl
      json.sub_name full_name
    end
  end
end