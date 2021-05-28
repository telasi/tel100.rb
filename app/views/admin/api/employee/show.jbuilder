json.id              @employee.id
json.first_name_en   @employee.first_name_en || ""
json.first_name_ka   @employee.first_name_ka
json.first_name_ru   @employee.first_name_ru
json.gender          @employee.gender
json.is_active       @employee.is_active
json.last_name_en    @employee.last_name_en
json.last_name_ka    @employee.last_name_ka
json.last_name_ru    @employee.last_name_ru
json.organization_id @employee.organization_id
json.name_en         @employee.organization.name_en
json.name_ka         @employee.organization.name_ka
json.name_ru         @employee.organization.name_ru
json.is_manager      @employee.organization.is_manager