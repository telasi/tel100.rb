# -*- encoding : utf-8 -*-
class AdminApiController < ApplicationController
  before_filter :on_admin_access, except: 'login'
  # protect_from_forgery with: :null_session

  rescue_from Exception do |exception|
    object = exception.object if exception.respond_to?(:object)

    render_api_error exception.message, object
  end

  def render_api_error(error, object)
    if error.is_a?(Array)
      render json: { success: false, error: error, object: object }
    else
      render json: { success: false, error: error.to_s, object: object }
    end
  end

  def current_user
    @_curr_user ||= (Sys::User.find(session[:user_id]) rescue nil) if session[:user_id]
  end
  helper_method :current_user

  private

  def on_admin_access
    if not current_user.present? or not current_user.admin?
      redirect_to admin_login_url, notice: 'You should be admin to access this page.'
    end
  end
end
