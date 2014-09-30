# -*- encoding : utf-8 -*-
class AdminController < ApplicationController
  include ActionView::Helpers::NumberHelper

  before_filter :startup_admin_application

  def side_links
    {
      home: { label: 'საწყისი', url: admin_home_url },
      users: { label: "მომხმარებლები (#{number_with_delimiter Sys::User.active.count})", url: admin_users_url, save_search: true },
      employees: { label: "თანამშრომლები (#{number_with_delimiter HR::Employee.active.count})", url: admin_employees_url, save_search: true }
    }
  end

  private

  def startup_admin_application
    @application = 'admin'
  end
end
