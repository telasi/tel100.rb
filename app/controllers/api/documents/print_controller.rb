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
    if @document.type.print_header?
      number = @document.docnumber ? @document.docnumber : '--'
      date = @document.docdate ? @document.docdate.strftime('%d/%m/%Y')  : '--'
    end
    file = print_html I18n.locale, html, margins, number, date
    send_file file, type: 'application/pdf', disposition: 'inline'
  end

  private

  def print_html(locale, html, margins, number, date)
    src = Tempfile.new('html')
    src.write(html)
    src.close
    dest = Tempfile.new('pdf')

    cmd = "java -cp lib/tel100.jar:lib/xmlworker.jar:lib/itextpdf.jar:lib/commons-io.jar tel100.HTMLToPdf #{I18n.locale} #{src.path} #{dest.path} #{margins.join(' ')}"
    if number.present?
      cmd = "#{cmd} #{number} #{date}"
    end
    `#{cmd}`
    dest
  end
end
