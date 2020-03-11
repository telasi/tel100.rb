# -*- encoding : utf-8 -*-
class Api::Documents::TypesController < ApiController
  before_filter :validate_login

  def index
    @types = Document::Type.order('order_by ASC')
    @types = @types.where("ALLOW_#{params[:direction]} = 1") if params[:direction].present?
  end

  def show
    @type = Document::Type.find(params[:id])
  end

  def create
    @type = Document::Type.new(type_params)
    if @type.save
      render action: 'show'
    else
      render_api_error @type.errors.full_messages
    end
  end

  def update
    @type = Document::Type.find(params[:id])
    if @type.update_attributes(type_params)
      render action: 'show'
    else
      render_api_error @type.errors.full_messages
    end
  end

  def destroy
    Document::Type.find(params[:id]).destroy
    render json: { success: true }
  end

  def gnerc_subtypes
    @types = Document::GnercSubtype.order('id ASC')
    @types = @types.where('OLD IS NULL') if params[:editable]
  end

  private

  def type_params
    params.require(:type).permit(:name_ka, :name_ru, :name_en, :order_by)
  end
end
