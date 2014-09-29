# -*- encoding : utf-8 -*-
class Admin::HomeController < AdminController
  before_filter :startup_homecontroller

  def index
    @title = 'საწყისი'
    @users = Sys::User.where(is_active: true)
    @employees = HR::Employee.where(is_active: true)
  end

  private

  def startup_homecontroller; @subapplication = :home end
end
