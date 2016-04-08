# -*- encoding : utf-8 -*-
require 'pdfkit'

class Api::Documents::PrintController < ApiController
  def card
  	I18n.locale = params[:lang]
    @document = Document::Base.find(params[:id])
    @user_id = params[:user]
  end

  def print
    @assignees = params[:assignees] == 'true'
    @author = params[:author] == 'true'
    @signature = params[:signature] == 'true'
    @subject = params[:subject] == 'true'
    I18n.locale = params[:lang]
    @document = Document::Base.find(params[:id])
    @margins = @document.type ? @document.type.margins : Document::Type.default_margins
    @print_header = @document.type ? @document.type.print_header : true
  end
end
