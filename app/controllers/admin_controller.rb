# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  before_filter :startup_admin_application

  def active_users; Sys::User.where(is_active: true) end

  def side_links
    {
      home: { label: 'საწყისი', url: admin_home_url },
      users: { label: "მომხმარებლები (#{active_users.count})", url: admin_users_url },
    }
  end

  private

  def startup_admin_application
    @application = 'admin'
  end
end
