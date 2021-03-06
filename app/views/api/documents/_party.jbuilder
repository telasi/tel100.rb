json.id party.id
json.type party.class.name
json.name party.to_s

if party.is_a?(HR::Employee)
  json.user_id party.user_id
  json.person_number party.person_number
  json.first_name party.first_name
  json.last_name party.last_name
  json.ext_type 'hr.Employee'
elsif party.is_a?(HR::Organization)
  json.name party.name.strip
  json.ext_type 'hr.Organization'
elsif party.is_a?(HR::Party)
  json.name party.name_ka.strip
  json.ext_type 'hr.Party'
elsif party.is_a?(BS::Customer)
  json.name party.name.strip
  json.ext_type 'bs.Customer'
end
