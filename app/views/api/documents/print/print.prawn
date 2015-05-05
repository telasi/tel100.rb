require 'barby'
require 'barby/barcode/qr_code'
require 'barby/outputter/prawn_outputter'

def default_font(pdf, size = 9); pdf.change_font('default', size) end

def month_name(month)
  case month
  when 1 then 'იანვარი'
  when 2 then 'თებერვალი'
  when 3 then 'მარტი'
  when 4 then 'აპრილი'
  when 5 then 'მაისი'
  when 6 then 'ივნისი'
  when 7 then 'ივლისი'
  when 8 then 'აგვისტო'
  when 9 then 'სექტემბერი'
  when 10 then 'ოქტომბერი'
  when 11 then 'ნოემბერი'
  when 12 then 'დეკემბერი'
  end
end

def barcode(pdf)
  pdf.bounding_box [10,720], :width => 200 do
    barcode = Barby::QrCode.new("#{@document.docnumber}")
    barcode.annotate_pdf(pdf, :xdim => 3, :ydim => 3)
  end
end

def title(pdf)
  pdf.text "#{@document.subject}", :align => :center, :size => 14
end

def header(pdf)
  docdate = @document.docdate.strftime '%d-%b-%Y %H:%M' if @document.docdate.present?
  pdf.text_box "#{I18n.t('views.document.print.number')} #{@document.docnumber}" + "\n" +
                "#{I18n.t('views.document.print.date')} #{docdate}",
      :at => [400, 760], :width => 150, :size => 8
end

def body(pdf)
 pdf.move_down 20
 pdf.text "#{@document.body}", :align => :justify, :size => 10
end

def authors(pdf)
 pdf.move_down 60

 data = [[]]

 @document.authors.each_with_index do |author, index|
    text = author.respond_to?(:organization) ? author.organization.chained_name : ""
    text += "\n#{author}"
    data += [[ text, "", "" ]]

    #data += [[ text, "", "#{author}" ]]
 end

 pdf.table(data, :cell_style => { :font => pdf.set_font_name('default'), :borders => [] }) do
    column(0).width = 300
    column(1).width = 100
    column(2).width = 100
    column(2).style(:valign => :bottom)
  end
end

def assignees(pdf)
 pdf.move_down 60

 text = "#{I18n.t('views.document.print.assignees')} "

 text += @document.assignees.map{ |a| a.full_name }.join(', ')

 pdf.text text
end

prawn_document(page_size: 'A4', margin: [40, 40]) do |pdf|
  default_font(pdf)
  barcode(pdf)

  pdf.move_down 40

  title(pdf) if params[:subject].present?
  header(pdf)
  body(pdf)
  authors(pdf) if params[:author].present?
  assignees(pdf) if params[:assignees].present?
end
