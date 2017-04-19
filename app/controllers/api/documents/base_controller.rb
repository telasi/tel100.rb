# -*- encoding : utf-8 -*-
class Api::Documents::BaseController < ApiController
  before_filter :validate_login

  def index
    @my_docs = doc_list(@my_docs, params[:folderType], 0, params[:folderId])
    @total   = @my_docs.count
    @my_docs = @my_docs.offset(params["start"]) if params["start"]
    @my_docs = @my_docs.limit(params["limit"]) if params["limit"]
    @my_docs = @my_docs.order('receive_date DESC, document_id DESC')
  end

  def search
    director = false

    if params['show_all'].present? and params['show_all'] == 'on'
      director = true
      #@my_docs = Document::User.all.joins(:document) if current_user.is_director?
      @my_docs = Document::User.select('document_base.docnumber, 
                                        document_id,
                                        min(user_id) as user_id,
                                        min(HAS_DUE_DATE) as has_due_date,
                                        min(COMPLETED_OVER_DUE) as COMPLETED_OVER_DUE,
                                        min(CURRENT_DUE_DATE) as CURRENT_DUE_DATE,
                                        min(IS_NEW) as IS_NEW,
                                        min(IS_CHANGED) as IS_CHANGED,
                                        min(IS_SHOWN) as IS_SHOWN,
                                        min(IS_FORWARDED) as IS_FORWARDED,
                                        min(IS_SENT) as IS_SENT,
                                        min(IS_RECEIVED) as IS_RECEIVED,
                                        min(IS_CURRENT) as IS_CURRENT,
                                        min(IS_CANCELED) as IS_CANCELED,
                                        min(IS_COMPLETED) as IS_COMPLETED,
                                        min(AS_OWNER) as AS_OWNER,
                                        min(AS_SENDER) as AS_SENDER,
                                        min(AS_ASSIGNEE) as AS_ASSIGNEE,
                                        min(AS_SIGNEE) as AS_SIGNEE,
                                        min(AS_AUTHOR) as AS_AUTHOR,
                                        min(document_user.CREATED_AT) as CREATED_AT,
                                        min(document_user.UPDATED_AT) as UPDATED_AT,
                                        min(RECEIVE_DATE) as RECEIVE_DATE')
                                        .joins(:document)
                                        .group('document_base.docnumber, document_id') if current_user.is_director?
    else 
      @my_docs = Document::User.mydocs(effective_user)
      @my_docs = doc_list(@my_docs, 'standard', 1, params['folder']) if params['folder'].present?
    end

    # @my_docs = @my_docs.joins(:document)

    if params['sender'].present?
      @employees = HR::Employee.find_by_name(params['sender'])
      @my_docs = @my_docs.where('document_base.sender_id IN (?)', @employees)
    end

    author_filter(params['author'])
    united_role_filter(params['assignee'], 'assignee')
    united_role_filter(params['signee'],   'signee')

    @my_docs = customer_filter(@my_docs, params['customer']) if params['customer'].present?

    @my_docs = @my_docs.where("document_base.docyear" => params['docyear']) if params['docyear'].present?
    @my_docs = @my_docs.where("document_base.type_id" => params['type']) if params['type'].present?
    @my_docs = @my_docs.where("document_base.docdate >= ?", Date.strptime(params['docdate_from'], '%d/%m/%Y')) if params['docdate_from'].present?
    @my_docs = @my_docs.where("document_base.docdate <= ?", Date.strptime(params['docdate_to'], '%d/%m/%Y')) if params['docdate_to'].present?
    @my_docs = @my_docs.where("document_base.due_date >= ?", Date.strptime(params['due_date_from'], '%d/%m/%Y')) if params['due_date_from'].present?
    @my_docs = @my_docs.where("document_base.due_date <= ?", Date.strptime(params['due_date_to'], '%d/%m/%Y')) if params['due_date_to'].present?
    @my_docs = @my_docs.where("document_base.direction" => params['direction']) if params['direction'].present?
    @my_docs = @my_docs.where("document_base.docnumber LIKE ?", "#{params['docnumber'].strip.likefy}") if params['docnumber'].present?
    @my_docs = @my_docs.where("document_base.original_number LIKE ?", "#{params['original_number'].strip.likefy}") if params['original_number'].present?
    @my_docs = @my_docs.where("document_base.docnumber2" => params['docnumber2'].strip) if params['docnumber2'].present?
    @my_docs = @my_docs.where("lower(document_base.subject) LIKE ?", '%' + params['subject'].strip.mb_chars.downcase.to_s + '%') if params['subject'].present?
    if params['body'].present?
       @my_docs = @my_docs.joins('JOIN document_text ON document_text.document_id = document_user.document_id').where("dbms_lob.instr(upper(document_text.body),upper(?))>=1", params['body'].strip) 
    end
    @my_docs = @my_docs.where("document_base.page_count" => params['page_count']) if params['page_count'].present?

    if not director 
      if params['state'] == 'current'
        @my_docs = @my_docs.where('is_current = 1')
      elsif params['state'] == 'canceled'
        @my_docs = @my_docs.where('is_canceled = 1')
      elsif params['state'] == 'completed'
        @my_docs = @my_docs.where('is_completed = 1')
      end
    end

    @total = @my_docs.length
    @my_docs = @my_docs.offset(params["start"]) if params["start"]
    @my_docs = @my_docs.limit(params["limit"]) if params["limit"]

    if director
      @my_docs = @my_docs.order('document_base.docnumber')
    else
      @my_docs = @my_docs.order('document_user.receive_date DESC, document_user.document_id DESC')
    end
  end

  def doc_list(pdocs, folderType, show_completed = 0, folderId)
    pdocs = Document::User.mydocs(effective_user) unless pdocs
    @docs = case folderType
      when 'standard'
        Folder::Standard.docs(pdocs, folderId, show_completed, effective_user)
      when 'custom'
        Folder::Document.docs(folderId, effective_user)
      else 
        Document::User.mydocs(effective_user)
    end
    @docs
  end

  def show
    @doc = Document::Base.find(params[:id])
    @my_doc = Document::User.where(document_id: params[:id], user: effective_user).first
    if @my_doc.present? and can_change_read_property?
      @my_doc.read!
    end
  end

  def create_draft
    if can_edit_document?
      doc = Document::Base.create_draft!(effective_user)
      @my_doc = Document::User.where(document: doc, user: effective_user).first
      render action: 'show'
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def update_draft
    doc = Document::Base.find(params[:id])
    if can_edit_document?(doc)
      doc.update_draft!(effective_user, params)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def delete_draft
    doc = Document::Base.find(params[:id])
    if can_edit_document?(doc)
      doc.delete_draft!(effective_user)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def send_draft
    doc = Document::Base.find(params[:id])
    if can_edit_document?(doc)
      doc.send_draft!(current_user)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def reply
    sourcedoc = Document::Base.find(params[:sourceid])
    if can_edit_document?(sourcedoc)
      newdoc = sourcedoc.create_reply!(current_user)
      @my_doc = Document::User.where(document: newdoc, user: current_user).first
      render action: 'show'
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def clone
    if can_edit_document?
      doc = Document::Base.find(params[:sourceid])
      newdoc = doc.clone!(effective_user)
      @my_doc = Document::User.where(document: newdoc, user: effective_user).first
      render action: 'show'
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end    
  end

  def edit
    doc = Document::Base.find(params[:id])
    render json: { success: doc.modify(params, effective_user) }
  end

  def modification
    render json: { success: true, is_auto_signee: effective_user.id == AUTO_SIGNEE }
  end

  def author_filter(search_string)
    if search_string.present?
      search_string = search_string.strip
      if search_string.size > 2
        employee_ids = HR::Employee.where('first_name_ka IN (:name) OR first_name_ru IN (:name) OR last_name_ka IN (:name) OR last_name_ru IN (:name)', name: search_string.split(' ')).map{ |e| e.id }
        party_ids = HR::Party.where('name_ka LIKE :name OR name_ru LIKE :name OR name_en LIKE :name', name: search_string.likefy).map{ |p| p.id }
        customer_ids = BS::Customer.where("name LIKE N\'%#{search_string}%\'").map{ |p| p.id }

        if ( employee_ids.none? and party_ids.none? and customer_ids.none?)
          @my_docs = @my_docs.none
        else
          @my_docs = @my_docs.where("id in (select document_id from document_motion where receiver_id IN (:employee_ids) AND receiver_type = 'HR::Employee' AND receiver_role = 'author'
                                            union select id from document_base b where owner_id IN (:employee_ids) AND owner_type = 'HR::Employee'
                                                     and not exists ( select document_id from document_motion where document_id = b.id and receiver_id IN (:employee_ids) AND receiver_type = 'HR::Employee' AND receiver_role = 'author')
                                            )
                                     or id in (select document_id from document_motion where receiver_id IN (:party_ids) AND receiver_type = 'HR::Party' AND receiver_role = 'author'
                                            union select id from document_base b where owner_id IN (:party_ids) AND owner_type = 'HR::Party'
                                                     and not exists ( select document_id from document_motion where document_id = b.id and receiver_id IN (:party_ids) AND receiver_type = 'HR::Party' AND receiver_role = 'author')
                                            )
                                     or id in (select document_id from document_motion where receiver_id IN (:customer_ids) AND receiver_type = 'BS::Customer' AND receiver_role = 'author'
                                            union select id from document_base b where owner_id IN (:customer_ids) AND owner_type = 'BS::Customer'
                                                     and not exists ( select document_id from document_motion where document_id = b.id and receiver_id IN (:customer_ids) AND receiver_type = 'BS::Customer' AND receiver_role = 'author')
                                            )", employee_ids: employee_ids, party_ids: party_ids, customer_ids: customer_ids)

          # , employee_ids: employee_ids)
          # @my_docs = @my_docs.where("", ids: party_ids) if party_ids.any?
          # @my_docs = @my_docs.where("", ids: customer_ids) if customer_ids.any?
         end
      end
    end
  end

  def united_role_filter(search_string, role)
    if search_string.present?
      search_string = search_string.strip
      if search_string.size > 2
        employee_ids = HR::Employee.where('first_name_ka IN (:name) OR first_name_ru IN (:name) OR last_name_ka IN (:name) OR last_name_ru IN (:name)', name: search_string.split(' ')).map{ |e| e.id }
        party_ids = HR::Party.where('name_ka LIKE :name OR name_ru LIKE :name OR name_en LIKE :name', name: search_string.likefy).map{ |p| p.id }

        if ( employee_ids.none? and party_ids.none? )
          @my_docs = @my_docs.none
        else
          @my_docs = @my_docs.where("id in (select document_id from document_motion where receiver_id IN (?) AND receiver_type = 'HR::Employee' AND receiver_role = ?)", employee_ids, role) if employee_ids.any?
          @my_docs = @my_docs.where("id in (select document_id from document_motion where receiver_id IN (?) AND receiver_type = 'HR::Party' AND receiver_role = ?)", party_ids, role) if party_ids.any?
        end

      end
    end

    # search_string = search_string.squish.tr(' ', '%')
    # @doc = pdoc.where("exists (select document_id from document_motion where exists ( 
    #   select id from 
    #     (select 'HR::Employee' as class, id, TO_NCHAR(last_name_ka) as name  from hr_employees 
    #     where last_name_ka || first_name_ka ||  last_name_ru || first_name_ru || last_name_en || first_name_en like N'%#{search_string}%'
    #                                       union 
    #                                       select 'HR::Party' as class, id, TO_NCHAR(name_ka) from party_base
    #                                                   where name_ka || name_ru || name_en like N'%#{search_string}%'
    #                                       ) b where b.class = document_motion.receiver_type and b.id = document_motion.receiver_id
    #                                             and receiver_role = '#{role}'
    #                                             and document_id = document_user.document_id ))
    #                   ");
#                                          select 'BS::Customer' as class, custkey as id, TO_NCHAR(name) from customer 
#                                                     where name like N'%#{search_string}%'
#                                        union 
  end

  def customer_filter(pdoc, customer)
    @doc = pdoc.where("exists ( select document_id from document_motion 
                                    where exists ( 
                                        select id from 
                                          ( select custkey as id from customer b where custkey = #{customer} ) b
                                                 where 'BS::Customer' = document_motion.receiver_type 
                                                   and b.id = document_motion.receiver_id
                                                   and document_id = document_user.document_id ))");
  end
end
