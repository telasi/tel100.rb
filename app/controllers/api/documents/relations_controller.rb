# -*- encoding : utf-8 -*-
class Api::Documents::RelationsController < ApiController
  def index
    @relations = Document::Relation.where(base_id: params[:base_id]).order(:id)
  end

  def create
    document = Document::Base.find(params[:base_id])
    related = Document::Base.find(params[:related_id])
    rel = Document::Relation.create(base: document, related: related)
    render json: { id: rel.id }
  end
end
