# -*- encoding : utf-8 -*-
module ApplicationHelper

  def empty_text(models = nil, url = nil)
    if url and models.respond_to?(:total_entries) and models.total_entries > 0
      t('forma.no_data_p1', url: url)
    else
      t('forma.no_data')
    end
  end

end
