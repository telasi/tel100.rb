# -*- encoding : utf-8 -*-
class Api::Documents::ResponseTypesController < ApiController
  def index
    if params[:type] == 'send'
      @types = Document::ResponseType.send_types
    elsif params[:type] == 'response'
      @types = Document::ResponseType.response_types
    else
      @types = Document::ResponseType
    end
    @types = @types.where(role: params[:role]) if params[:role].present?
    @types = @types.order('role, direction, ordering, id')
  end
end
