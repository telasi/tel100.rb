# -*- encoding : utf-8 -*-
class Api::Docs::TypesController < ApiController
  def index
    render json: {
      success: true,
      types: Document::Type.order('order_by ASC')
    }
  end
end
