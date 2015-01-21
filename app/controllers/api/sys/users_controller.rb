# -*- encoding : utf-8 -*-
require 'sys/user'

class Api::Sys::UsersController < ApiController
  before_filter :validate_login

  def index
    @users = Sys::User.order('username ASC')
  end
end
