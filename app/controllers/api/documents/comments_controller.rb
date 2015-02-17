# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  include Document::Status
  before_filter :validate_login

  def create
    user = current_user
    doc  = Document::Base.find(params[:document_id])
    motion = Document::Motion.find(params[:motion_id]) if params[:motion_id].present?
    raise 'illegal document' if ( motion.present? and motion.document != doc )
    Document::Comment.create(user, doc, motion, params)
    render json: { success: true }
  end
end
