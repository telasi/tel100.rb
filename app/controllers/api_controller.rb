# -*- encoding : utf-8 -*-
class ApiController < ActionController::Base
  protect_from_forgery with: :null_session

  def login
    # sleep 5
    render json: {
      success: true,
      message: 'Hello Dimitri'
    }
  end
end
