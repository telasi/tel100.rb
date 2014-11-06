# -*- encoding : utf-8 -*-
class Api::DocsController < ApiController
  include TreeUtils
  before_filter :validate_login, except: 'types'

  def index
    documents = Document::Base.order('docnumber DESC')
    filter = params[:filter]
    if filter
      filter = JSON.parse(filter)
      filter = filter.index_by{|node| node["property"]}

      documents = documents.where(id: filter['id']['value']) if filter['id'].present?
      documents = documents.where("docdate >= ?", Date.strptime(filter['from_docdate']['value'])) if filter['from_docdate'].present?
      documents = documents.where("docdate <= ?", Date.strptime(filter['to_docdate']['value'])) if filter['to_docdate'].present?
      documents = documents.where(type_id: filter['typeId']['value']) if filter['typeId'].present?
      documents = documents.where(docnumber: filter['docnumber']['value']) if filter['docnumber'].present?
      documents = documents.where("subject LIKE ?", filter['subject']['value']+'%') if filter['subject'].present?
      documents = documents.where("dueDate => ?", Date.strptime(filter['from_dueDate']['value'])) if filter['from_dueDate'].present?
      documents = documents.where("dueDate <= ?", Date.strptime(filter['to_dueDate']['value'])) if filter['to_dueDate'].present?
    end

    render json: documents.all.to_json( :include => [
      { author_user: { only: [:first_name_ka, :last_name_ka, :first_name_ru, :last_name_ru, :first_name_en, :last_name_en] } },
      { sender_user: { only: [:first_name_ka, :last_name_ka, :first_name_ru, :last_name_ru, :first_name_en, :last_name_en] } },
      :text
    ])
  end

  def types; render json: { success: true, types: Document::Type.order('order_by ASC') } end
  def show; @document = Document::Base.where(id: params[:id]).first end

  def create
    doc = Document::Base.sending_document(current_user, params)
    render json: { success: true, document: { id: doc.id } }
  end

  def motions
    if params[:flat]
      render json: Document::Motion.where(document_id: params[:id]).map do |x|
        {
          id: x.id, receiver_id: x.receiver.id, receiver_type: x.receiver.class.name,
          motion_text: x.motion_text, due_date: x.due_date,
          name: x.receiver_ext_name, image: x.receiver_ext_icon
        }
      end
    else
      render json: array_to_tree(Document::Motion.where(document_id: params[:id]).as_json)
    end
  end

  def authors
    render json: Document::Author.where(document_id: params[:id]).order(:id).map do |x|
      {
        id: x.id, author_id: x.author.id, author_type: x.author.class.name,
        note: x.note, name: x.author_ext_name, icon: x.author_ext_icon }
    end
  end
end
