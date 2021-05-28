# -*- encoding : utf-8 -*-
class Admin::Api::HrController < AdminApiController
    def employee
        render json: HR::Employee.find(params[:id])
    end
end