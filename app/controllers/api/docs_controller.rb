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
    @document = Document::Base.where(id: params[:id]).first
    docuser = Document::User.where(user: current_user, document: @document).first
    raise "You cannot view this document!" if docuser.blank?
    docuser.is_read = 1
    docuser.save
  end

  def create
    doc = Document::Base.sending_document(current_user, params)
    render json: { success: true, document: { id: doc.id } }
  end

  def motions
    if params[:flat]
      render json: (Document::Motion.where(document_id: params[:id]).order(:ordering, :id).map do |x|
        resp = {
          id: x.id,
          due_date: x.due_date,
          ordering: x.ordering,
          motion_text: x.motion_text,
          receiver_id: x.receiver.id,
          receiver_type: x.receiver.class.name,
          receiver_role: x.receiver_role,
          name: x.receiver_ext_name,
          image: x.receiver_ext_icon
        }
        if x.receiver.is_a?(HR::Employee)
          resp[:is_manager] = x.receiver.organization.is_manager
          resp[:organization] = x.receiver.organization.name
        end
        resp
      end)
    else
      motions_array = Document::Motion.where(document_id: params[:id]).order(:ordering, :id).map do |m|
        resp = {
          id: m.id,
          parent_id: m.parent_id,
          status: m.status,
          due_date: m.due_date,
          motion_text: m.motion_text, 
          response_text: m.response_text,
          sender_is_read: m.sender_is_read,
          receiver_is_read: m.receiver_is_read,
          sender_full_name: m.sender_ext_name,
          name: m.receiver_ext_name,
          image: m.receiver.icon
        }
        if m.receiver.is_a?(HR::Employee)
          resp[:is_manager] = m.receiver.organization.is_manager
          resp[:organization] = m.receiver.organization.name
        end
        resp
      end
      render json: array_to_tree(motions_array)
    end
  end

  def add_comment
    doc = Document::Base.find(params[:id])
    doc.respond(current_user, params)
    render json: { success: true  }
  end

  def types
    render json: { success: true, types: Document::Type.order('order_by ASC') }
  end
end
