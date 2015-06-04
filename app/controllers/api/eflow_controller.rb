# -*- encoding : utf-8 -*-
class Api::EflowController < ApiController
  before_filter :validate_login

  def motions
    @motions = effective_user.eflow_motions.order("motion_id DESC").paginate(per_page: params[:limit], page: params[:page])
  end
end
