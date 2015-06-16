# -*- encoding : utf-8 -*-
class Api::Documents::ChangesController < ApiController
  before_filter :validate_login

  def index
    @changes = Document::Change.where(document: params[:id]).order(created_at: :desc)
  end

  def show
    @change = Document::Change.find(params[:change_no])
  end
end
