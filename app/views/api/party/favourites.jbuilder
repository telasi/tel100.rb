json.array! @favourites do |favourite|
  json.id          favourite.id
  json.name        favourite.name
  json.person_id   favourite.person_id
  json.person_type favourite.person_type
end