# -*- encoding : utf-8 -*-
class Api::Documents::BaseController < ApiController
  before_filter :validate_login

  def index
    @my_docs = doc_list(params[:folderType], params[:folderId])
    @total = @my_docs.count
    @my_docs = @my_docs.offset(params["start"]) if params["start"]
    @my_docs = @my_docs.limit(params["limit"]) if params["limit"]
  end

  def search
    user = current_user.self_or_sub(current_substitude)

    @my_docs = Document::User.mydocs(user).joins(:document)
    @my_docs = doc_list('standard', 1, params['folder']) if params['folder'].present?
    @my_docs = @my_docs.joins(:document)

    if params['sender'].present?
      @employees = HR::Employee.find_by_name(params['sender'])
      @my_docs = @my_docs.where('document_base.sender_id IN (?)', @employees)
    end

    @my_docs = united_role_filter(@my_docs, params['author'], 'author') if params['author'].present?
    @my_docs = united_role_filter(@my_docs, params['assignee'], 'assignee') if params['assignee'].present?
    @my_docs = united_role_filter(@my_docs, params['signee'], 'signee') if params['signee'].present?

    @my_docs = @my_docs.where("document_base.docyear" => params['docyear']) if params['docyear'].present?
    @my_docs = @my_docs.where("document_base.type_id" => params['type']) if params['type'].present?
    @my_docs = @my_docs.where("document_base.docdate >= ?", Date.strptime(params['docdate_from'], '%d/%m/%Y')) if params['docdate_from'].present?
    @my_docs = @my_docs.where("document_base.docdate <= ?", Date.strptime(params['docdate_to'], '%d/%m/%Y')) if params['docdate_to'].present?
    @my_docs = @my_docs.where("document_base.direction" => params['direction']) if params['direction'].present?
    @my_docs = @my_docs.where("document_base.docnumber" => params['docnumber']) if params['docnumber'].present?
    @my_docs = @my_docs.where("document_base.subject LIKE ?", params['subject']+'%') if params['subject'].present?
    @my_docs = @my_docs.where("document_base.page_count" => params['page_count']) if params['page_count'].present?

    @total = @my_docs.count
    @my_docs = @my_docs.offset(params["start"]) if params["start"]
    @my_docs = @my_docs.limit(params["limit"]) if params["limit"]
  end

  def doc_list(folderType, show_completed = 0, folderId)
    user = current_user.self_or_sub(current_substitude)
    case folderType
      when 'standard'
        Folder::Standard.docs(folderId, show_completed, user)
      when 'custom'
        Folder::Document.docs(folderId, user)
      else 
        Document::User.mydocs(user)
    end
  end

  def show
    @my_doc = Document::User.where(document_id: params[:id], user: current_user).first
    @my_doc.read!
  end

  def create_draft
    doc = Document::Base.create_draft!(current_user)
    @my_doc = Document::User.where(document: doc, user: current_user).first
    render action: 'show'
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

  def united_role_filter(pdoc, search_string, role)
    search_string = search_string.squish.tr(' ', '%')
    @doc = pdoc.where("exists ( select document_id from document_motion 
                                    where exists ( 
                                      select id from 
                                          (select 'HR::Employee' as class, id, TO_NCHAR(last_name_ka) as name  from hr_employees 
                                                      where last_name_ka || first_name_ka ||  last_name_ru || first_name_ru || 
                                                            last_name_en || first_name_en like N'%#{search_string}%'
                                          union 
                                          select 'HR::Party' as class, id, TO_NCHAR(name_ka) from party_base
                                                      where name_ka || name_ru || name_en like N'%#{search_string}%'
                                          ) b where b.class = document_motion.receiver_type and b.id = document_motion.receiver_id
                                                and receiver_role = '#{role}'
                                                and document_id = document_user.document_id ))");
#                                          select 'BS::Customer' as class, custkey as id, TO_NCHAR(name) from customer 
#                                                     where name like N'%#{search_string}%'
#                                        union 
  end
end
