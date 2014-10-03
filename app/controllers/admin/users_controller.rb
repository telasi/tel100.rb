# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController

  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active.order(:username).paginate(page: params[:page], per_page: 10)
  end

  def new
    @title = 'ახალი მომხმარებელი'
    @employee = HR::Employee.find(params[:employee_id]) if params[:employee_id]
    if request.post?
      @user = Sys::User.new(params.require(:sys_user).permit(:username, :virtual_password))
      @user.employee = @employee
      redirect_to admin_user_url(id: @user.id) if @user.save
    else
      @user = Sys::User.new(employee: @employee)
    end
  end

  def show
    @user = Sys::User.find(params[:id])
    @title = @user.full_name
  end

end
