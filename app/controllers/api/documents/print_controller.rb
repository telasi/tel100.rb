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
    html = render_to_string "api/documents/print/print"
    margins = @document.type.margins
    kit = PDFKit.new(html, page_size: 'A4', margin_top: "#{margins[0]}in", margin_right: "#{margins[1]}in", margin_bottom: "#{margins[2]}in", margin_left: "#{margins[3]}in")
    send_data kit.to_pdf, type: 'application/pdf', disposition: 'inline'
  end
end
