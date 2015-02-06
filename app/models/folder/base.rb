# -*- encoding : utf-8 -*-
class Folder::Base < ActiveRecord::Base
  self.table_name  = 'folder_base'
  self.sequence_name = 'folder_base_seq'

end