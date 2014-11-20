# -*- encoding : utf-8 -*-
module DocumentsHelper
  def document_statuses_html(doc)
    texts = []
    if doc.motions_completed > 0
      texts << "<span class=\"text-muted text-success-b\"><i class=\"fa fa-check\"></i> #{doc.motions_completed}</span>"
    end
    if doc.motions_canceled > 0
      texts << "<span class=\"text-danger text-danger-b\"><i class=\"fa fa-times\"></i> #{doc.motions_canceled}</span>"
    end
    if doc.motions_waiting > 0
      texts << "<span class=\"text-muted text-muted-b\"><i class=\"fa fa-clock-o\"></i> #{doc.motions_waiting}</span>"
    end    
    texts.any? ? texts.join(' ') : '--'
  end
end
