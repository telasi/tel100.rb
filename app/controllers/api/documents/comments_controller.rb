# -*- encoding : utf-8 -*-
class Api::Documents::CommentsController < ApiController
  include Document::Status
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
    user = current_user
    doc  = Document::Base.find(params[:document_id])
    motions = doc.motions.where(status: CURRENT, receiver_user_id: user.id, receiver_role: Document::ROLE_SIGNEE)
    Document::Comment.transaction do
      motions.each do |motion|
        motion.add_comment!(user, params)
      end
    end
    render json: { success: true }
  end

  def author
    user = current_user
    doc  = Document::Base.find(params[:document_id])
    motions = doc.motions.where(status: CURRENT, receiver_user_id: user.id, receiver_role: Document::ROLE_ASSIGNEE)
    Document::Comment.transaction do
      motions.each do |motion|
        motion.add_comment!(user, params)
      end
    end
    render json: { success: true }
  end
end
