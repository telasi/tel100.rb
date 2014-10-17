# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  before_filter :on_admin_access

  private

  def on_admin_access
    # if current_user.blank? and not current_user.admin?
    #   redirect_to home_url
    # end
  end
end
