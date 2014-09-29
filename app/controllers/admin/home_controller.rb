# -*- encoding : utf-8 -*-
class Admin::HomeController < AdminController

  def index
    @title = 'საწყისი'
    @users = Sys::User.where(is_active: true)
    @employees = HR::Employee.where(is_active: true)
  end

end
