# -*- encoding : utf-8 -*-
class Api::Documents::PrintController < ApiController
  def card
  	I18n.locale = params[:lang]
    @document = Document::Base.find(params[:id])
  end

  def print
    @assignees = params[:assignees] == 'true'
    @author = params[:author] == 'true'
    @signature = params[:signature] == 'true'
    @subject = params[:subject] == 'true'
    I18n.locale = params[:lang]
    @document = Document::Base.find(params[:id])
  end
end
