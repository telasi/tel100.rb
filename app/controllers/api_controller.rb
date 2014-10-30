# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  def current_user; @curruser ||= Sys::User.authenticate(params[:username], params[:password]) end
  def current_empl; current_user.employee if current_user.present? end
  def validate_login; raise 'not authorized' if current_user.blank? end
end
