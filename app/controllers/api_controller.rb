# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  MSG_CANNOT_EDIT = 'You cannot edit this document.'
  MSG_CANNOT_READ = 'You cannot read this document.'
  MSG_CANNOT_COMMENT = 'You cannot comment on this document.'

  protect_from_forgery with: :null_session
  before_action :validate_locale

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

  def current_locale; params[:api_locale] || 'ka' end
  def current_user; @curruser ||= Sys::User.authenticate(params[:api_username], params[:api_password]) end
  def current_empl; current_user.employee if current_user.present? end
  def validate_login; raise 'not authorized' if current_user.blank? end
  def validate_locale; I18n.locale = current_locale end

  # Returns current "proxy" user.
  def current_proxy
    unless @__proxy_initialized
      proxy_id = params[:api_proxyid]
      current_user = self.current_user
      if proxy_id.present? and current_user
        @__proxy_roles = Sys::UserRelation.where(user: current_user, related_id: proxy_id).all.map{|rel| rel.role}
        if @__proxy_roles.any?
          @__proxy = Sys::User.find(proxy_id) rescue nil
        end
      end
      @__proxy_initialized = true
    end
    @__proxy
  end

  def current_proxy_roles
    @__proxy_roles if current_proxy.present?
  end

  # Who is "effective" user for most queries.
  def effective_user
    self.current_proxy || self.current_user
  end

  # Can read given document?
  def can_read_document?(doc = nil)
    true
  end

  # Can edit given document?
  def can_edit_document?(doc = nil)
    if self.current_user == self.effective_user
      return true
    end

    if current_proxy_roles and current_proxy_roles.include?(Sys::UserRelation::REL_CANCELARIA)
      return true
    end

    return false
  end

  # Can document's read status changed by given user?
  def can_change_read_property?(doc = nil)
    self.can_edit_document?(doc)
  end

  # Can comment given document?
  def can_comment_document?(doc = nil)
    self.can_edit_document?(doc)
  end

  def can_see_every_document?(doc = nil)
    self.current_user.is_director == 1
  end
end
