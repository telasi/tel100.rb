# -*- encoding : utf-8 -*-
class Sys::UserTemplates < ActiveRecord::Base
  self.table_name  = 'user_templates'
  self.sequence_name = 'usertemplates_seq'

  belongs_to :user, class_name: 'Document::User', foreign_key: 'user_id'
end
