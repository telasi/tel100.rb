# -*- encoding : utf-8 -*-
class SiteController < ApplicationController
  def index; @title = 'საწყისი' end

  def login
    @title = 'შესვლა'
    if request.post?
      userid = params[:userid] ; password = params[:password]
      if userid.blank?
        @error = 'ჩაწერეთ მომხმარებლის სახელი'
      elsif password.blank?
        @error = 'ჩაწერეთ პაროლი'
      else
        user = Sys::User.authenticate(userid, password)
        @error = 'არასწორი მომხმარებლის სახელი ან პაროლი' and return if user.blank?
        session[:current_user_id] = user.id
        redirect_to root_url and return
      end
    end
    render layout: 'clean'
  end
end
