# -*- encoding : utf-8 -*-
class Document::GnercSubtype < ActiveRecord::Base
  self.table_name  = 'document_type_gnerc_subtype'
  self.localized_fields('name')
end
