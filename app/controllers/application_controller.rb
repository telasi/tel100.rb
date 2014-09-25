# -*- encoding : utf-8 -*-
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :validate_login

  def current_user
    if session[:current_user_id]
      @_curr_user ||= Sys::User.find(session[:current_user_id]) rescue nil
    end
  end

  helper_method :current_user

  protected

  def validate_login
    if current_user.blank? and Sys::User.any? and action_name != 'login'
      redirect_to login_url, notice: 'გაიარეთ ავტორიზაცია'
    end
  end
end
