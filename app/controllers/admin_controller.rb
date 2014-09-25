# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  before_filter :adminapp_startup

  protected

  def adminapp_startup
    @application = 'admin'
  end
end
