def default_font(pdf, size = 9); pdf.font('default', size) end

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

def page1(pdf)
  pdf.text 'sadasd', size: 20, align: :center
end

prawn_document(page_size: 'A4', margin: [50, 40]) do |pdf|
  page1(pdf)
end
