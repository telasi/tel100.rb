# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :validate_locale

  rescue_from Exception do |exception|
    render_api_error exception.message
  end

  def render_api_error(error)
    if error.is_a?(Array)
      render json: { success: false, error: error }
    else
      render json: { success: false, error: error.to_s }
    end
  end

  def current_locale; params[:api_locale] || 'ka' end
  def current_user; @curruser ||= Sys::User.authenticate(params[:api_username], params[:api_password]) end
  def current_empl; current_user.employee if current_user.present? end
  def validate_login; raise 'not authorized' if current_user.blank? end
  def validate_locale; I18n.locale = current_locale end

  # Returns current "proxy user".
  def current_proxy
    unless @__proxy_initialized
      proxy_id = params[:api_proxyid]
      current_user = self.current_user
      if proxy_id.present? and current_user
        if UserRelation.where(user: user, related_id: proxy_id).any?
          @__proxy = Sys::User.find(proxy_id) rescue nil
        end
      end
      @__proxy_initialized = true
    end
    @__proxy
  end

## XXX

  # current variables for Vacation
  # current Vacation object
  def current_substitude; HR::Vacation::Vacation.find(params[:substitude]) if params[:substitude].present? end
  # current user or substitude if set
  def current_user_sub; 
    if current_substitude
     user = Sys::User.find(current_substitude.userid)
     user.current_substitude = current_substitude
     user
    else
     current_user 
    end
  end
end
