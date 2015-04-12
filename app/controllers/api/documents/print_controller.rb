# -*- encoding : utf-8 -*-
class Api::Documents::PrintController < ApiController

  def card
    @document = Document::Base.find(params[:id])
  end

  def print
  	@document = Document::Base.find(params[:id])
  end
end
