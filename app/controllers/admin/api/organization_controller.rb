# -*- encoding : utf-8 -*-
class Admin::Api::OrganizationController < AdminApiController
    def show
        @organization = HR::Organization.find(params[:id])
        render json: @organization
    end

    def create
        @organization = HR::Organization.new(organization_params)
        @organization.save!
        $hrstruct_cachedate = nil
        $hrstruct_cache = nil
        render json: { success: true, message: "" }
    end
    
    def update
        @organization = HR::Organization.find(params[:id])
        @organization.update_attributes!(organization_params)
        $hrstruct_cachedate = nil
        $hrstruct_cache = nil
        render json: { success: true, message: "" }
    end

    def destroy
        @organization = HR::Organization.find(params[:id])
        @organization.destroy if @organization.present?
        render json: { success: true, message: "" }
    end

    private 

    def organization_params
        params.require(:organization).permit(:name_ka, :name_ru, :name_en, :is_manager, :parent_id)
    end
end