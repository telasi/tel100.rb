# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  before_filter :admin_area

  protected

  def admin_area
    @header_addition = 'Admin'
    # TODO: check admin privileges
  end
end
