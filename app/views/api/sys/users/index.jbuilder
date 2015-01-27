json.array! @users do |user|
  json.partial! 'api/sys/users/user', user: user
end
