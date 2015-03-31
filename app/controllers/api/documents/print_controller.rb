# -*- encoding : utf-8 -*-
class Api::Documents::PrintController < ApiController

  def card
    @document = Document::Base.find(params[:id])
  end
end
