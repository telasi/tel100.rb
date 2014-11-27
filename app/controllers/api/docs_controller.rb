# -*- encoding : utf-8 -*-
class Api::DocsController < ApiController
  include TreeUtils
  before_filter :validate_login, except: 'types'

  def index
    # documents = Document::Base.order('docnumber DESC')
    # filter = params[:filter]
    # if filter
    #   filter = JSON.parse(filter)
    #   filter = filter.index_by{|node| node["property"]}
    #   documents = documents.where(id: filter['id']['value']) if filter['id'].present?
    #   documents = documents.where("docdate >= ?", Date.strptime(filter['from_docdate']['value'])) if filter['from_docdate'].present?
    #   documents = documents.where("docdate <= ?", Date.strptime(filter['to_docdate']['value'])) if filter['to_docdate'].present?
    #   documents = documents.where(type_id: filter['typeId']['value']) if filter['typeId'].present?
    #   documents = documents.where(docnumber: filter['docnumber']['value']) if filter['docnumber'].present?
    #   documents = documents.where("subject LIKE ?", filter['subject']['value']+'%') if filter['subject'].present?
    #   documents = documents.where("dueDate => ?", Date.strptime(filter['from_dueDate']['value'])) if filter['from_dueDate'].present?
    #   documents = documents.where("dueDate <= ?", Date.strptime(filter['to_dueDate']['value'])) if filter['to_dueDate'].present?
    # end
    # render json: documents.all.to_json({
    #   include: [ { sender_user: { only: [:first_name, :last_name ] } } ], # XXX
    #   methods: :body
    # })
    @my_docs = Document::User.where(user: current_user).order('UPDATED_AT DESC')
  end

  def show
    @mydoc = Document::User.where(user: current_user, document_id: params[:id]).first
    raise "You cannot view this document!" if @mydoc.blank?
    @mydoc.update_attributes(is_read: 1)
  end

  def create
    doc = Document::Base.sending_document(current_user, params)
    render json: { success: true, document: { id: doc.id } }
  end

  def motions
    json = motions_hash Document::Motion.where(document_id: params[:id]).order(:ordering, :id)
    if params[:flat] then render json: json
    else render json: array_to_tree(json)
    end
  end

  def comments
    @comments = Document::Comment.where(document_id: params[:id]).order(:id)
  end

  def add_comment
    doc = Document::Base.find(params[:id])
    doc.respond(current_user, params)
    render json: { success: true  }
  end

  def types
    render json: { success: true, types: Document::Type.order('order_by ASC') }
  end

  private

  def motions_hash(motions)
    motions.map do |m|
      has_extra = m.receiver.is_a?(HR::Employee)
      {
        id: m.id,
        parent_id: m.parent_id,
        status: m.status,
        due_date: m.due_date,
        ordering: m.ordering,
        # sender info
        motion_text: m.motion_text,
        sender_name: m.sender_ext_name,
        sender_icon: m.sender_ext_icon,
        # receiver info
        response_text: m.response_text,
        receiver_user_id: m.receiver_user_id,
        receiver_id: m.receiver_id,
        receiver_type: m.receiver_type,
        role: m.receiver_role,
        name: m.receiver_ext_name,
        image: m.receiver_ext_icon,
        is_manager: (m.receiver.organization.is_manager if has_extra),
        organization: (m.receiver.organization.name if has_extra),
        # other information
        created_at: m.created_at,
        updated_at: m.updated_at
      }
    end
  end
end
