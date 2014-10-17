# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController
  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active.order('username')
  end

  def show
    @user = Sys::User.find(params[:id])
    @title = @user.full_name
  end

  def destroy
    user = Sys::User.find(params[:id])
    user.destroy
    redirect_to admin_users_url
  end
end
