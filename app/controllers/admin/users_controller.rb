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
      user = Sys::User.new(employee: @employee, username: params[:username], password: params[:password])
      if user.save
        redirect_to admin_user_url(id: user.id)
      else
        @errors = user.errors.full_messages
      end
    end
  end

  def show
    @user = Sys::User.find(params[:id])
    @title = @user.full_name
  end

  # def register
  #   employee = HR::Employee.find(params[:employee_id])
  #   user = Sys::User.new(params.permit(:username, :password))
  #   user.employee = employee
  #   user.save
  #   render json: { id: user.id }
  # end

end
