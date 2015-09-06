# -*- encoding : utf-8 -*-
class Document::ResponseType < ActiveRecord::Base
  include Document::ResponseTypeDirection

  self.table_name  = 'DOCUMENT_RESPONSE_TYPES'
  self.sequence_name = 'DOCRESPTYPE_SEQ'
  self.localized_fields('name')
  self.set_integer_columns :direction

  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def send?
    self.direction == SEND
  end

  def positive?
    return true if self.id == AUTO_SIGN_TYPE_ID
    self.direction == RESP_COMPLETE
  end

  def negative?
    self.direction == RESP_CANCEL
  end

  def self.send_types
    Document::ResponseType.where('direction IN (?)', [ SEND ])
  end

  def self.response_types
    Document::ResponseType.where('direction IN (?)', [ RESP_COMPLETE, RESP_CANCEL ])
  end

  def direction_name
    Document::ResponseType.direction_name(self.direction)
  end

  def self.direction_name(direction)
    case direction
    when SEND then 'გაგზავნა'
    when RESP_COMPLETE then 'დასრულება'
    when RESP_CANCEL then 'გაუქმება'
    end
  end

  def to_s; self.name end
end
