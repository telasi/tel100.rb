# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  include ActionView::Helpers::NumberHelper

  before_filter :startup_admin_application

  def active_users; Sys::User.where(is_active: true) end
  def active_employees; HR::Employee.where(is_active: true) end

  def side_links
    {
      home: { label: 'საწყისი', url: admin_home_url },
      users: { label: "მომხმარებლები (#{number_with_delimiter active_users.count})", url: admin_users_url, save_search: true },
      employees: { label: "თანამშრომლები (#{number_with_delimiter active_employees.count})", url: admin_employees_url, save_search: true }
    }
  end

  private

  def startup_admin_application
    @application = 'admin'
  end
end
