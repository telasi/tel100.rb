# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  before_filter :validate_login

  def index
    @motions = Document::Motion.where(document_id: params[:document_id], parent_id: params[:parent_id]).order('ordering ASC, id ASC')
  end

  def create_draft
    @motion = Document::Motion.create_draft!(current_user, params)
  end
end
