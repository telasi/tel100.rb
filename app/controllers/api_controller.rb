# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  def login
    user = Sys::User.authenticate(params[:userID], params[:password])
    if user.blank?
      render json: {
        success: false
      }
    else
      render json: {
        success: true,
        user: user.as_json(except: 'password_hash')
      }
    end
  end
end
