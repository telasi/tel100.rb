# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController

  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.where(is_active: true)
  end

end
