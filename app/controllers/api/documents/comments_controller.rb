# -*- encoding : utf-8 -*-
class Api::Documents::CommentsController < ApiController
  include Document::Status
  include Document::Role
  before_filter :validate_login

  def index
    @comments = Document::Comment.where(document_id: params[:document_id]).order('id DESC')
  end

  def create
    user = current_user
    doc  = Document::Base.find(params[:document_id])
    motion = Document::Motion.find(params[:motion_id]) if params[:motion_id].present?
    raise 'illegal document' if ( motion.present? and motion.document != doc )
    Document::Comment.create(user, doc, motion, params)
    render json: { success: true }
  end

  def sign
    doc  = Document::Base.find(params[:document_id])
    if can_comment_document?(doc)
      user = effective_user    
      motions = doc.motions.where(status: CURRENT, receiver_user_id: user.id, receiver_role: ROLE_SIGNEE)
      Document::Comment.transaction do
        motions.each do |motion|
          motion.add_comment!(user, params, current_user)
        end
      end
      render json: { success: true }
    else
      render json: { success: false, errors: MSG_CANNOT_COMMENT }
    end
  end

  def author
    doc  = Document::Base.find(params[:document_id])
    if can_comment_document?(doc)
      user = effective_user
      motions = doc.motions.where(status: CURRENT, receiver_user_id: user.id, receiver_role: ROLE_AUTHOR)
      Document::Comment.transaction do
        motions.each do |motion|
          motion.add_comment!(user, params, current_user)
        end
      end
      render json: { success: true }
    else
      render json: { success: false, errors: MSG_CANNOT_COMMENT }
    end
  end
end
