# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController

  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active
  end

  def new
    @title = 'ახალი მომხმარებელი'
    @user = Sys::User.new
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
      resp = { status: 'ok' }
    end
    render json: resp
  end

end
