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
end

def header(pdf)
end

def barcode(pdf)
  pdf.bounding_box [10,720], :width => 200 do
    barcode = Barby::QrCode.new("#{@document.docnumber}")
    barcode.annotate_pdf(pdf, :xdim => 3, :ydim => 3)
  end
end

def properties(pdf)
  docdate = @document.docdate.strftime '%d-%m-%Y %H:%M' if @document.docdate.present?
  due_date = @document.due_date.strftime '%d-%m-%Y %H:%M' if @document.due_date.present?

  pdf.move_down 60

  data = [ [I18n.t("views.document.print.number"),     "#{@document.docnumber}", ""] ]

  if not @document.original_number.blank?
    data += [[I18n.t("views.document.print.original_number"),     "#{@document.original_number}", ""] ]
  end

  data += [[I18n.t("views.document.print.type"),       "#{@document.type.name}", ""],
           [I18n.t("views.document.print.date"),       "#{docdate}", ""],
           [I18n.t("views.document.print.due_date"),   "#{due_date}", ""],
           [I18n.t("views.document.print.direction"),  I18n.t("models.document_base.direction.#{@document.direction}"), ""],
           [I18n.t("views.document.print.pages"),      "#{@document.page_count}", ""],
           [I18n.t("views.document.print.attachment"), "#{@document.additions}", ""]]

  incoming = @document.motions.where(receiver_user_id: @user_id).order('ordering ASC, id ASC')
  incoming.each_with_index do |motion, index|
    data += [[ index == 0 ? I18n.t("views.document.print.motion_text") : "",    
                "#{motion.sender} \n #{motion.created_at.localtime.strftime '%d-%m-%Y %H:%M'}",
                motion.motion_text ]] if not motion.motion_text.blank?
  end
  
  data +=  [[I18n.t("views.document.print.owner"),      "#{@document.sender.to_s}", 
             @document.sender.respond_to?(:organization) ? @document.sender.organization.chained_name : ""]]


  @document.authors.each_with_index do |author, index|
    data += [[ index == 0 ? I18n.t("views.document.print.authors") : "",    "#{author}",
               author.respond_to?(:organization) ? author.organization.chained_name : "", "#{ @document.author_resp_type[0] }"]]
  end
  @document.signee_motions.each_with_index do |signee, index|
    data += [[ index == 0 ? I18n.t("views.document.print.signees") : "",    
               "#{signee.receiver}", 
               (signee.receiver.respond_to?(:organization) && signee.receiver.organization.present?) ? signee.receiver.organization.chained_name : "",
               "#{ signee.response_type.nil? ? "" : signee.response_type.name} \n #{signee.response_text}"]]
  end
  @document.assignees.each_with_index do |assignee, index|
    data += [[ index == 0 ? I18n.t("views.document.print.assignees") : "",    
               assignee.respond_to?(:identity) ? "#{assignee} (#{assignee.identity})": "#{assignee}", 
               assignee.respond_to?(:organization) && assignee.organization.present? ? assignee.organization.chained_name : ""]]
  end
           
  data += [[I18n.t("views.document.print.subject"),   "#{@document.subject}", ""]]

  pdf.table(data, :cell_style => { :font => pdf.set_font_name('default'), :borders => [] }) do
    column(0).style(:borders => [:right])
    column(0).width = 80
    column(1).width = 120
    column(2).width = 240
    column(3).width = 110
  end
end

prawn_document(page_size: 'A4', margin: [40, 20]) do |pdf|
  default_font(pdf)
  barcode(pdf)
  properties(pdf)
end
