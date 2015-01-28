# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  before_filter :validate_login

  def index
    rel = Document::Motion.where(document_id: params[:document_id])
    if params[:mode] == 'out'
      rel = rel.where(sender_user: current_user,)
      rel = rel.where(parent_id: params[:parent_id]) if params[:parent_id].present?
    else
      rel = rel.where(receiver_user: current_user)
    end
    @motions = rel.order('ordering ASC, id ASC')
  end

  def create_draft
    @motion = Document::Motion.create_draft!(current_user, params)
  end

  def delete_draft
    motion = Document::Motion.find(params[:id])
    motion.destroy
    render json: { status: 'ok' }
  end
end
