# -*- encoding : utf-8 -*-
class Api::Documents::TypesController < ApiController
  before_filter :validate_login
  # formats [:json]
  respond_to :json

  def index
    @types = Document::Type.order('order_by ASC')
    render formats: ['json']
  end

  def show
    @type = Document::Type.find(params[:id])
    render formats: ['json']
  end
end
