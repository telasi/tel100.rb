# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController

  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active.order(:username).paginate(page: params[:page], per_page: 10)
  end

  def new
    @title = 'ახალი მომხმარებელი'
    @user = Sys::User.new
  end

  def show
    @user = Sys::User.find(params[:id])
    @title = @user.full_name
  end

  def register
    employee = HR::Employee.find(params[:employee_id])
    user = Sys::User.new(params.permit(:username, :password))
    user.employee = employee
    user.save
    render json: { id: user.id }
  end

  def check_username
    username = params[:username]
    if username.blank?
      resp = { error: 'მომხმარებლის სახელი არაა მოცემული' }
    elsif not /[a-z][a-z0-9_\.]{3,}/i =~ username
      resp = { error: 'არასწორი მომხმარებლის სახელი' }
    elsif Sys::User.where(username: username.downcase).first
      resp = { error: 'მომხმარებლის სახელი დაკავებულია' }
    else
      resp = { username: username }
    end
    render json: resp
  end

end
