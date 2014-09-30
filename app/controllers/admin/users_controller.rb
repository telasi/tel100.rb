# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController

  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active
  end

  def new
    @title = 'ახალი მომხმარებელი'
  end

end
