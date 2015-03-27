# -*- encoding : utf-8 -*-
class Api::Documents::BaseController < ApiController
  before_filter :validate_login

  def index
    @my_docs = doc_list(params[:folderType], params[:folderId])
  end

  def search
    user = current_user.self_or_sub(current_substitude)

    @my_docs = Document::User.mydocs(user).joins(:document)
    @my_docs = doc_list('standard', params['folder'], params['substitude']) if params['folder'].present?
    @my_docs = @my_docs.joins(:document)

    if params['sender'].present?
      @employees = HR::Employee.find_by_name(params['sender'])
      @my_docs = @my_docs.where('document_base.sender_id IN (?)', @employees)
    end
    
    @my_docs = @my_docs.where("document_base.type_id" => params['type']) if params['type'].present?
    @my_docs = @my_docs.where("document_base.docdate >= ?", Date.strptime(params['docdate_from'], '%d/%m/%Y')) if params['docdate_from'].present?
    @my_docs = @my_docs.where("document_base.docdate <= ?", Date.strptime(params['docdate_to'], '%d/%m/%Y')) if params['docdate_to'].present?
    @my_docs = @my_docs.where("document_base.direction" => params['direction']) if params['direction'].present?
    @my_docs = @my_docs.where("document_base.docnumber" => params['docnumber']) if params['docnumber'].present?
    @my_docs = @my_docs.where("document_base.subject LIKE ?", params['subject']+'%') if params['subject'].present?
    @my_docs = @my_docs.where("document_base.page_count" => params['page_count']) if params['page_count'].present?
  end

  def doc_list(folderType, folderId)
    user = current_user.self_or_sub(current_substitude)
    case folderType
      when 'standard'
        Folder::Standard.docs(folderId, user)
      when 'custom'
        Folder::Document.docs(folderId)
      else 
        Document::User.mydocs(user)
    end
  end

  def show
    @my_doc = Document::User.where(document_id: params[:id]).first
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
