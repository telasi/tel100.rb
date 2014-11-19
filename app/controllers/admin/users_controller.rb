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

  def new
    @title = 'ახალი მომხმარებელი'
    if request.post?
      @user = Sys::User.new(user_params)
      redirect_to admin_user_url(id: @user.id) if @user.create_user
    else
      @user = Sys::User.new
    end
  end

  def edit
    @title = 'მომხმარებლის შეცვლა'
    @user = Sys::User.find(params[:id])
    if request.post?
      redirect_to admin_user_url(id: @user.id) if @user.update_user(user_params)
    end
  end

  def destroy
    user = Sys::User.find(params[:id])
    user.destroy
    redirect_to admin_users_url
  end

  private

  def user_params; params.require(:sys_user).permit(:username, :virtual_password, :email, :mobile, :phone, :employee_id, :is_active, :is_admin) end
end
