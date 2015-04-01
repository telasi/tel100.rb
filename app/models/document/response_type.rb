# -*- encoding : utf-8 -*-
class Document::ResponseType < ActiveRecord::Base
  SEND     = 1
  COMPLETE = 5
  CANCEL   = 6

  self.table_name  = 'DOCUMENT_RESPONSE_TYPES'
  self.sequence_name = 'DOCRESPTYPE_SEQ'
  self.set_integer_columns :category
  self.localized_fields('name')
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :motion, class_name: 'Document::Motion', foreign_key: 'motion_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def self.send_types
    self.where(category: SEND)
  end

  def self.response_types
    self.where("category IN (?)", [COMPLETE,CANCEL])
  end

  def typename
    case self.category
    when SEND then 'გაგზავნა'
    when COMPLETE then 'დასრულება'
    when CANCEL then 'გაუქმება'
    end
  end
end
