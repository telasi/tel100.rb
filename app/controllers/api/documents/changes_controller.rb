# -*- encoding : utf-8 -*-
class Api::Documents::ChangesController < ApiController
  before_filter :validate_login

  def index
    @changes = Document::Change.where(document: params[:id]).order(created_at: :desc)
  end

  def show
    @change = Document::Change.find(params[:change_no])
  end

  def motion
  	@motions = Document::History::Motion.where(change_no: params[:change_no], receiver_role: params[:role]).to_a
  end

  def files
  	@files = Document::History::File.where(change_no: params[:change_no])
  end
end
