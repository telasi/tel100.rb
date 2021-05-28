# -*- encoding : utf-8 -*-
class Admin::Api::EmployeeController < AdminApiController
    def show
        @employee = HR::Employee.find(params[:id])
    end

    def create
        HR::Employee.transaction do
            @organization = HR::Organization.new(position_params)
            @organization.saporg_type = 'S'
            @organization.save!
            @employee = HR::Employee.new(employee_params)
            @employee.organization = @organization
            @employee.person_id = 999999
            @employee.save!
            $hrstruct_cache = nil
        end
        render json: { success: true, message: "" }
    end
    
    def update
        @employee = HR::Employee.find(params[:id])
        if @employee.present?
            HR::Employee.transaction do
                @employee.update_attributes!(employee_params)
                @organization = @employee.organization
                @organization.update_attributes!(position_params)
                $hrstruct_cache = nil
            end
        end
        render json: { success: true, message: "" }
    end

    def destroy
        HR::Employee.transaction do
            @employee = HR::Employee.find(params[:id])
            @organization = @employee.organization
            @organization.destroy if @organization.present?
            @employee.destroy
            $hrstruct_cache = nil
        end
        render json: { success: true, message: "" }
    end

    private 

    def employee_params
        params.require(:employee).permit(:first_name_ka, :last_name_ka, :first_name_ru, :last_name_ru, :first_name_en, :last_name_en)
    end

    def position_params
        params.require(:employee).permit(:name_ka, :name_ru, :name_en, :is_manager, :parent_id)
    end
end