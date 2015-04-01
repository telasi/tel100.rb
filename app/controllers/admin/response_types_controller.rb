# -*- encoding : utf-8 -*-
class Admin::ResponseTypesController < AdminController
  def index
    @title = 'პასუხის სახეობები'
    @types = Document::ResponseType.order('category, ordering, id')
  end

  def show
    @title = 'პასუხის სახეობა'
    @type = Document::ResponseType.find(params[:id])
  end

  def new
    @title = 'ახალი სახეობა'
    if request.post?
      @type = Document::ResponseType.new(type_params)
      if @type.save
        redirect_to admin_response_type_url(@type)
      end
    else
      @type = Document::ResponseType.new(ordering: 1)
    end
  end

  def edit
    @title = 'სახეობის რედაქტირება'
    @type = Document::ResponseType.find(params[:id])
    if request.post?
      if @type.update_attributes(type_params)
        redirect_to admin_response_type_url(@type)
      end
    end
  end

  def destroy
    type = Document::ResponseType.find(params[:id])
    type.destroy
    redirect_to admin_response_types_url
  end

  protected

  def type_params
    params.require(:document_responsetype).permit(:name_ka, :name_ru, :name_en, :ordering, :category)
  end
end
