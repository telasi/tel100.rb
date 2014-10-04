# -*- encoding : utf-8 -*-
module UrlManager
  ALL_APPLICATIONS = ['tel100', 'admin']

  def self.included(base)
    base.before_filter :check_return_url
  end

  def return_url; session.delete :return_url end
  def check_return_url; session[:return_url] = params[:return_url] if  params[:return_url] end
end
