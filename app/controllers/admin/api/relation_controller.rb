# -*- encoding : utf-8 -*-
class Admin::Api::RelationController < AdminApiController
    def index
        render json: Sys::User.all.order(is_active: :desc).order(:username)
    end
end