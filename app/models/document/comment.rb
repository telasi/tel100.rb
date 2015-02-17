# -*- encoding : utf-8 -*-
class Document::Comment < ActiveRecord::Base
  include Document::Role
  include Document::Status

  NEUTRAL  = 'comment'
  POSITIVE = 'confirm'
  NEGATIVE = 'reject'

  self.table_name  = 'document_comment'
  self.sequence_name = 'doccomment_seq'
  self.set_integer_columns :status, :old_status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :motion, class_name: 'Document::Motion', foreign_key: 'motion_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def self.create(user, doc, motion, params)
    if motion
      motion.add_comment(user, params)
    else
      doc.add_comment(user, params)
    end
  end
end
