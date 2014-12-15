# -*- encoding : utf-8 -*-
class Api::Documents::TypesController < ApiController
  before_filter :validate_login

  def index
    @types = Document::Type.order('order_by ASC')
    render formats: ['json']
  end
end
