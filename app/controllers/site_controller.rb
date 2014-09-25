# -*- encoding : utf-8 -*-
class SiteController < ApplicationController
  def index; @title = 'საწყისი' end

  def login
    @title = 'შესვლა'
    if request.post?
      userid = params[:userid] ; password = params[:password]
      if userid.blank?
        @error = 'ჩაწერეთ მომხმარებელი'
      elsif password.blank?
        @error = 'ჩაწერეთ პაროლი'
      else
        user = Sys::User.authenticate(userid, password)
        if user.blank?
          @error = 'არასწორი მომხმარებელი ან პაროლი'
        else
          session[:current_user_id] = user.id
          redirect_to '/' and return
        end
      end
    end
    render layout: 'clean'
  end
end
