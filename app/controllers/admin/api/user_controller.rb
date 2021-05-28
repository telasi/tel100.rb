# -*- encoding : utf-8 -*-
class Admin::Api::UserController < AdminApiController
    def index
        render json: Sys::User.all.order(is_active: :desc).order(:username)
    end

    def create
        @user = Sys::User.new(user_params)
        render json: { success: @user.save, message: @user.errors.full_messages[0] || "" }
    end

    def update
        @user = Sys::User.find(params[:id])
        @user.update_attributes!(user_params)
        render json: { success: true, message: "" }
    end

    def relations
        render json: Sys::User.find(params[:user_id]).relations, include: { related: { only: [:username], methods: :full_name } }
    end

    def new_relation
        if request.post?
            @user = Sys::User.find(params[:user_id])
            @relation = Sys::UserRelation.new(params.require(:relation).permit(:role, :related_id))
            @relation.user = @user
            render json: { success: @relation.save, message: @relation.errors.full_messages[0] || "error" }
        else 
            render json: { role: Sys::UserRelation::RELATIONS, users: Sys::User.all.as_json(methods: :full_name)}
        end
    end

    def destroy_relation
        rel = Sys::UserRelation.find([params[:user_id], params[:related_id], params[:role]])
        rel.destroy
        render json: { success: true, message: "" }
    end

    private

    def user_params
        params.require(:user).permit(:username, :virtual_password, :email, :mobile, :phone, :employee_id, :is_active, :is_admin, :is_director, :first_name_ka, :last_name_ka, :first_name_ru, :last_name_ru, :password)
    end
end