# -*- encoding : utf-8 -*-
class Api::Documents::PrintController < ApiController

  def card
  	I18n.locale = params[:lang]
    @document = Document::Base.find(params[:id])
  end

  def print
  	I18n.locale = params[:lang]
  	@document = Document::Base.find(params[:id])
  end
end
