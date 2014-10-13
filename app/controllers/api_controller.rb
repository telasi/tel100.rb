# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  def login
    user = Sys::User.authenticate(params[:userID], params[:password])
    if user.blank?
      render json: { status: false }
    else
      render json: user.to_json
    end
  end
end
