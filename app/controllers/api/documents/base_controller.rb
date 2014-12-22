# -*- encoding : utf-8 -*-
class Api::Documents::BaseController < ApiController
  before_filter :validate_login

  def index
    @my_docs = Document::User.where(user: current_user).order('UPDATED_AT desc')
  end
end
