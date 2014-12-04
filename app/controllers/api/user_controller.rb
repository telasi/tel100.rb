# -*- encoding : utf-8 -*-
class Api::UserController < ApiController
  def login
    @user = Sys::User.authenticate(params[:userID], params[:password])
    if @user.blank?
      render json: { success: false }
    else
      render formats: ['json']
    end
  end
end
