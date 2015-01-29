# -*- encoding : utf-8 -*-
class Api::Documents::BaseController < ApiController
  before_filter :validate_login

  def index
    @my_docs = Document::User.where(user: current_user).order('UPDATED_AT desc')
  end

  def show
    @my_doc = Document::User.where(user: current_user, document_id: params[:id]).first
  end

  def create_draft
    doc = Document::Base.create_draft!(current_user)
    render json: { id: doc.id }
  end

  def update_draft
    doc = Document::Base.find(params[:id])
    doc.update_draft!(current_user, params)
    render json: { success: true }
  end

  def delete_draft
    doc = Document::Base.find(params[:id])
    doc.delete_draft!(current_user)
    render json: { success: true }
  end

  def send_draft
    doc = Document::Base.find(params[:id])
    doc.send_draft!(current_user)
    render json: { success: true }
  end
end
