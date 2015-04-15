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

def direction(dir)
  case dir
    when 'in' then 'შემოსული'
    when 'inner' then 'შიდა'
    when 'out' then 'გასული'
  end
end

def barcode(pdf)
end

def header(pdf)
end

def barcode(pdf)
  pdf.bounding_box [10,720], :width => 200 do
    barcode = Barby::QrCode.new("#{@document.docnumber}")
    barcode.annotate_pdf(pdf, :xdim => 3, :ydim => 3)
  end
end

def title(pdf)
  pdf.move_down 40
  pdf.text "#{@document.subject}", :align => :center, :size => 14
end

def body(pdf)
 pdf.move_down 20
 pdf.text "#{@document.body}", :align => :justify, :size => 10
end

def signature(pdf)
 pdf.move_down 60

 data = [[]]

 @document.authors.each_with_index do |author, index|
    data += [[ author.respond_to?(:organization) ? author.organization.chained_name : "", "", "#{author}" ]]
 end

 pdf.table(data, :cell_style => { :font => pdf.set_font_name('default'), :borders => [] }) do
    column(0).width = 300
    column(1).width = 100
    column(2).width = 100
    column(2).style(:valign => :bottom)
  end
end

def properties(pdf)
  pdf.move_down 60

  data = [ ["ნომერი:",    "#{@document.docnumber}", ""],
           ["სახეობა:",    "#{@document.type.name}", ""],
           ["თარიღი:",    "#{@document.docdate}", ""],
           ["ვადა:",       "#{@document.due_date}", ""],
           ["მიმართულება:", direction(@document.direction), ""],
           ["გვერდები:",   "#{@document.page_count}", ""],
           ["დანართი:",    "#{@document.additions_count}", ""],
           ["ინიციატორი:", "#{@document.sender.full_name}", "#{@document.sender.organization.chained_name}"]]


  @document.assignees.each do |assignee|
    data += [["ადრესატები:",    "#{assignee.full_name}", "#{assignee.organization.chained_name}"]]
  end
           
  data += [["სათაური:",   "#{@document.subject}", ""]]

  pdf.table(data, :cell_style => { :font => pdf.set_font_name('default'), :borders => [] }) do
    column(0).style(:borders => [:right])
    column(0).width = 80
    column(1).width = 170
    column(2).width = 260
  end
end

prawn_document(page_size: 'A4', margin: [40, 40]) do |pdf|
  default_font(pdf)
  barcode(pdf)
  title(pdf)
  body(pdf)
  signature(pdf)
end