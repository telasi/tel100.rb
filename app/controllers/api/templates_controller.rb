# -*- encoding : utf-8 -*-
class Api::TemplatesController < ApiController
  def index
    @templates = Sys::UserTemplates.where("(USER_ID = ? and CATEGORY = 1 ) or CATEGORY = 0", current_user.id).all
  end

end
