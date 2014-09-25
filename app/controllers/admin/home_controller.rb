# -*- encoding : utf-8 -*-
class Admin::HomeController < AdminController
  def index
    @title = 'ადმინისტრირება'
    @users = Sys::User.where(is_active: true)
    @employees = HR::Employee.where(is_active: true)
  end
end
