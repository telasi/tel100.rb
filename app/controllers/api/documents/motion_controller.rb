# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  before_filter :validate_login

  def index
    @document = Document::Base.find(params[:document_id])
    rel = @document.motions
    if params[:mode] == 'out'
      rel = rel.where(sender_user: current_user)
      rel = rel.where(parent_id: params[:parent_id]) if params[:parent_id].present?
    else
      hasbase = true if current_user == @document.sender_user
      rel = rel.where(receiver_user: current_user)
    end
    motions = rel.order('ordering ASC, id ASC').to_a
    @motions = hasbase ? [ nil ] + motions : motions
  end

  def create_draft
    @motion = Document::Motion.create_draft!(current_user, params)
  end

  def update_draft
    motion = Document::Motion.find(params[:id])
    motion.update_draft!(current_user, params)
    render json: { status: 'ok' }
  end

  def delete_draft
    motion = Document::Motion.find(params[:id])
    motion.delete_draft!(current_user)
    render json: { status: 'ok' }
  end
end
