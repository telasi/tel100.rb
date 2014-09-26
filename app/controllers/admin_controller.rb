# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  before_filter :startup_admin_application

  private

  def startup_admin_application
    @application = 'admin'
  end
end
