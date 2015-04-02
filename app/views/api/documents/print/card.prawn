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

def row(pdf, textsize, title, value, y)
  title_x = 10
  value_x = 100

  pdf.change_font('default', textsize)
  pdf.text_box title, :at => [title_x, y]
  pdf.change_font('bold', textsize)
  pdf.text_box value, :at => [value_x, y]
  end

def properties(pdf)
  y = 700
  deltaY = 15

  row(pdf, 9, "ნომერი:", "#{@document.type_id}", y)

  y = y - deltaY

  row(pdf, 9, "სახეობა:", "#{@document.type.name}", y)

  y = y - deltaY

  row(pdf, 9, "თარიღი:", "#{@document.docdate}", y)

  y = y - deltaY

  row(pdf, 9, "ვადა:", "#{@document.due_date}", y)

  y = y - deltaY

  row(pdf, 9, "მიმართულება:", direction(@document.direction), y)

  y = y - deltaY

  row(pdf, 9, "გვერდები:", "#{@document.page_count}", y)

  y = y - deltaY

  row(pdf, 9, "დანართი:", "#{@document.additions_count}", y)

  y = y - deltaY

  row(pdf, 9, "ინიციატორი:", "#{@document.sender.full_name} #{@document.sender}", y)

  y = y - deltaY

  row(pdf, 9, "ავტორი:", "#{@document.owner.full_name} #{@document.owner}", y)

  y = y - deltaY

  row(pdf, 9, "ადრესატები:", "#{@document.owner.full_name} #{@document.owner}", y)

  y = y - deltaY

  row(pdf, 9, "სათაური:", "#{@document.subject}", y)
end

prawn_document(page_size: 'A4', margin: [40, 40]) do |pdf|
  default_font(pdf)
  barcode(pdf)
  properties(pdf)
end
