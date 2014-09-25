# -*- encoding : utf-8 -*-
class SiteController < ApplicationController
  def index; @title = 'საწყისი' end

  def login
    @title = 'მომხმარებლის ავტორიზაცია'
    if request.post?
      userid = params[:userid] ; password = params[:password]
      @error = 'ჩაწერეთ მომხმარებლის სახელი' and return if userid.blank?
      @error = 'ჩაწერეთ პაროლი' and return if password.blank?
      user = Sys::User.authenticate(userid, password)
      @error = 'არასწორი მომხმარებლის სახელი ან პაროლი' and return if user.blank?
      session[:current_user_id] = user.id
      redirect_to root_url
    end
  end
end
