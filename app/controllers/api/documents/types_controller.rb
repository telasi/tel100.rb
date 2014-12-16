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

  def create
    @type = Document::Type.new(type_params)
    if @type.save
      render action: 'show', formats: ['json']
    else
      render_api_error @type.errors.full_messages
    end
  end

  def update
    @type = Document::Type.find(params[:id])
    if @type.update_attributes(type_params)
      render action: 'show', formats: ['json']
    else
      render_api_error @type.errors.full_messages
    end
  end

  private

  def type_params
    params.require(:type).permit(:name_ka, :name_ru, :name_en, :order_by)
  end
end
