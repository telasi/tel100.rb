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

  def edit
    @title = 'მომხმარებლის შეცვლა'
    @user = Sys::User.find(params[:id])
    if request.post?
      if @user.update_attributes(params.require(:sys_user).permit(:username, :virtual_password, :email, :mobile, :phone, :employee_id))
        redirect_to admin_user_url(id: @user.id)
      end
    end
  end

  def destroy
    user = Sys::User.find(params[:id])
    user.destroy
    redirect_to admin_users_url
  end
end
