# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  before_filter :on_admin_access, except: 'login'
  before_filter :on_i18n

  def current_user
    @_curr_user ||= (Sys::User.find(session[:user_id]) rescue nil) if session[:user_id]
  end
  helper_method :current_user

  private

  def on_i18n
    I18n.locale = 'ka'
  end

  def on_admin_access
    if not current_user.present? or not current_user.admin?
      redirect_to admin_login_url, notice: 'You should be admin to access this page.'
    end
  end
end
