if party.is_a?(HR::Employee)
  json.id party.id
  json.user_id party.user_id
  json.person_number party.person_number
  json.first_name party.first_name
  json.last_name party.last_name
  json.ext_type 'hr.Employee'
elsif party.is_a?(HR::Organization)
  json.id party.id
  json.name party.name.strip
  json.ext_type 'hr.Organization'
end
