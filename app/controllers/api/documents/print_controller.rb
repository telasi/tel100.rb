# -*- encoding : utf-8 -*-
require 'pdfkit'

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
    html = render_to_string "api/documents/print/print"
    kit = PDFKit.new(html, page_size: 'A4', margin_top: '0.25in', margin_left: '0.25in', margin_right: '0.25in', margin_bottom: '0.25in')
    send_data kit.to_pdf, type: 'application/pdf', disposition: 'inline'
  end
end
