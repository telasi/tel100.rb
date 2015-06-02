# -*- encoding : utf-8 -*-
require 'sys/user'
class Api::UserController < ApiController
  def login
    @user = Sys::User.authenticate(params[:userID], params[:password])
    if @user.blank?
      render json: { success: false, message: I18n.t('controllers.user.errors.illegal_username_and_password') }
    end
  end

  def related
    @relations = current_user.relations.where('role NOT IN (?)', Sys::UserRelation::REL_AUTO_ASSIGNEE)
  end

  def update
    @user = current_user
    if @user.update_attributes(params.permit(:username, :mobile, :phone, :email))
      render action: 'login'
    else
      render json: { success: false, message: @user.errros.full_messages.to_s }
    end
  end

  def change_password
    @user = current_user
    @user.virtual_password = params[:password]
    if @user.save
      render json: { success: true }
    else
      render json: { success: false, message: @user.errros.full_messages.to_s }
    end
  end
end
