# -*- encoding : utf-8 -*-
class Admin::DoctypesController < AdminController
  def index
    @title = 'დოკუმენტის სახეობები'
    @types = Document::Type.order('order_by ASC')
  end

  def show
    @type = Document::Type.find params[:id]
    @title = @type.name
  end

  def new
    @title = 'ახალი სახეობა'
    if request.post?
      @type = Document::Type.new(doctype_params)
      if @type.save
        redirect_to admin_doctype_url(id: @type.id)
      end
    else
      @type = Document::Type.new
    end
  end

  def edit
    @type = Document::Type.find params[:id]
    @title = @type.name
    if request.post?
      if @type.update_attributes(doctype_params)
        redirect_to admin_doctype_url(id: @type.id)
      end
    end
  end

  private

  def doctype_params; params.require(:document_type).permit(:name_ka, :name_ru, :name_en, :order_by) end
end
