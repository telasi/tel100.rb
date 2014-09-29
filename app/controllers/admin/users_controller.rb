# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController
  before_filter :startup_userscontroller

  def index
    @title = 'მომხმარებლები'
    @users = active_users
  end

  private

  def startup_userscontroller; @subapplication = :users end
end
