# -*- encoding : utf-8 -*-
class Api::Documents::RelationsController < ApiController
  def index
    @relations = Document::Relation.where(base_id: params[:base_id]).order(:id)
  end

  def answer
    @relations = Document::Relation.where(related_id: params[:related_id]).order(:id)
  end

  def create
    document = Document::Base.find(params[:base_id])
    rid = params[:related_id]
    rtype = params[:related_type]
    rel = Document::Relation.where(base: document, related_id: rid, related_type: rtype).first
    if rel.present?
      raise I18n.t('models.document_relations.errors.relation_exists')
    else
      rel = Document::Relation.create(base: document, related_id: rid, related_type: rtype)
      render json: { id: rel.id }
    end
  end

  def delete
    Document::Relation.find(params[:id]).destroy
    render json: { success: true }
  end
end
