# -*- encoding : utf-8 -*-
module Authentification
  ALL_APPLICATIONS = ['tel100', 'admin']

  def self.included(base)
    base.before_filter :validate_login
    base.helper_method :current_user
    base.helper_method :my_applications
    base.helper_method :current_application
    base.helper_method :current_app
    base.helper_method :all_applications
  end

  def current_user
    if session[:current_user_id]
      @_curr_user ||= Sys::User.find(session[:current_user_id]) rescue nil
    end
  end

  def all_applications; ALL_APPLICATIONS end
  def my_applications; ALL_APPLICATIONS end
  def current_application; @application || 'tel100' end
  alias_method :current_app, :current_application

  def validate_login
    if current_user.blank? and Sys::User.any? and action_name != 'login'
      redirect_to login_url, notice: 'გაიარეთ ავტორიზაცია'
    end
  end
end
