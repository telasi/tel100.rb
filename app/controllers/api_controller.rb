# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  def login
    user = Sys::User.authenticate(params[:userID], params[:password])
    render json: user.to_json
  end
end
