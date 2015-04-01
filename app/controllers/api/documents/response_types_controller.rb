# -*- encoding : utf-8 -*-
class Api::Documents::ResponseTypesController < ApiController
  def index
    if params[:type] == 'send'
      @types = Document::ResponseType.send_types
    else
      @types = Document::ResponseType.response_types
    end
  end
end
