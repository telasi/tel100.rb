# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :validate_locale

  rescue_from Exception do |exception|
    render_api_error exception.message
  end

  def render_api_error(error)
    render json: { success: false, error: error.to_s }
  end

  def current_locale; params[:api_locale] || 'ka' end
  def current_user; @curruser ||= Sys::User.authenticate(params[:api_username], params[:api_password]) end
  def current_empl; current_user.employee if current_user.present? end
  def validate_login; raise 'not authorized' if current_user.blank? end
  def validate_locale; I18n.locale = current_locale end
end
