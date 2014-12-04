# -*- encoding : utf-8 -*-
class Api::UserController < ApiController
  def login
    @user = Sys::User.authenticate(params[:userID], params[:password])
    if @user.blank?
      render json: { success: false, message: I18n.t('controllers.user.errors.illegal_username_and_password') }
    else
      render formats: ['json']
    end
  end
end
