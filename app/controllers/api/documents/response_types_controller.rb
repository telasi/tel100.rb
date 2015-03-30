# -*- encoding : utf-8 -*-
class Api::Documents::ResponseTypesController < ApiController
  def index
    @types = Document::ResponseType.where(typekey: params[:typekey])
  end
end
