json.success true
json.user do
  json.id          @user.id
  json.email       @user.email
  json.mobile      @user.mobile
  json.phone       @user.phone
  json.username    @user.username
  json.email_confirmed   @user.email_confirmed
  json.mobile_confirmed  @user.mobile_confirmed
  json.is_active   @user.is_active
  json.is_admin    @user.is_admin
  json.employee_id @user.employee_id
  json.person_id   @user.person_id
  json.first_name  @user.first_name
  json.last_name   @user.last_name
  json.created_at  @user.created_at
  json.updated_at  @user.updated_at
end