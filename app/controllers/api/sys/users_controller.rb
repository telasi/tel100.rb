# -*- encoding : utf-8 -*-
class Api::Sys::UsersController < ApiController
  before_filter :validate_login

  def index
    @users = Sys::User.order('username ASC')
    render formats: ['json']
  end
end
