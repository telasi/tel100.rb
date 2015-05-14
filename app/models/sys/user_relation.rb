# -*- encoding : utf-8 -*-
class Sys::UserRelation < ActiveRecord::Base
  self.table_name  = 'user_relations'
  self.primary_keys = :user_id, :related_id
  belongs_to :user, class_name: 'Sys::User'
  belongs_to :related, class_name: 'Sys::User'
end
