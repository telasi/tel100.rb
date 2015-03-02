# -*- encoding : utf-8 -*-
class Api::Documents::BaseController < ApiController
  before_filter :validate_login

  def index
    @my_docs = case params[:folderType]
                when 'standard'
                  Folder::Standard.docs(params[:folderId], current_user)
                when 'custom'
                  Folder::Document.docs(params[:folderId])
                else 
                  Document::User.mydocs(current_user).order('UPDATED_AT desc')
               end
  end

  def search
    @my_docs = Document::User.mydocs(current_user).joins(:document)
    @my_docs = @my_docs.where("document_base.type_id" => params['type']) if params['type'].present?
    @my_docs = @my_docs.where("document_base.docdate >= ?", Date.strptime(params['docdate_from'], '%d/%m/%Y')) if params['docdate_from'].present?
    @my_docs = @my_docs.where("document_base.docdate <= ?", Date.strptime(params['docdate_to'], '%d/%m/%Y')) if params['docdate_to'].present?
    @my_docs = @my_docs.where("document_base.direction" => params['direction']) if params['direction'].present?
    @my_docs = @my_docs.where("document_base.docnumber" => params['docnumber']) if params['docnumber'].present?
    @my_docs = @my_docs.where("document_base.subject LIKE ?", params['subject']+'%') if params['subject'].present?
    @my_docs = @my_docs.where("document_base.page_count" => params['page_count']) if params['page_count'].present?
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
