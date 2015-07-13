# -*- encoding : utf-8 -*-
class Admin::BaseController < AdminController
  def index
    @title = 'სისტემის ადმინისტრირება'
  end

  def login
    @title = 'შესვლა'
    if request.post?
      @user = Sys::User.authenticate(params[:email], params[:password])
      if @user.present?
        session[:user_id] = @user.id
        redirect_to admin_home_url
      end
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to admin_login_url
  end
end
