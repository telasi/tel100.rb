# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController
  def index
    @title = 'მომხმარებლები'
    @users = Sys::User.active.order('username')
  end
end
