# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController

  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active.order(:username).paginate(page: params[:page], per_page: 10)
  end

  def new
    @title = 'ახალი მომხმარებელი'
    if request.post?
      @user = Sys::User.new(params.require(:sys_user).permit(:username, :virtual_password, :employee_id))
      redirect_to admin_user_url(id: @user.id) if @user.save
    else
      employee = HR::Employee.find(params[:employee_id]) if params[:employee_id]
      @user = Sys::User.new(employee: employee)
    end
  end

  def show
    @user = Sys::User.find(params[:id])
    @title = @user.full_name
  end

  def edit
    @title = 'მომხმარებელის შეცვლა'
    @user = Sys::User.find(params[:id])
    if request.post?
      if @user.update_attributes(params.require(:sys_user).permit(:mobile, :email))
        redirect_to (return_url || admin_user_url(id: @user.id))
      end
    end
  end

end
