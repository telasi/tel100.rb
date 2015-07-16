# -*- encoding : utf-8 -*-
class Document::Comment < ActiveRecord::Base
  include Document::Role
  include Document::Status

  self.table_name  = 'document_comment'
  self.sequence_name = 'doccomment_seq'
  self.set_integer_columns :status, :old_status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :motion, class_name: 'Document::Motion', foreign_key: 'motion_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  belongs_to :actual_user, class_name: 'Sys::User', foreign_key: 'actual_user_id'
  belongs_to :receiver_user, class_name: 'Sys::User', foreign_key: 'receiver_user_id'

  before_save :calculate_receiver_user

  def calculate_receiver_user
    if self.motion.present?
      user1 = motion.actual_sender
      user2 = motion.last_receiver
      if user1 == self.user || user1 == self.actual_user
        self.receiver_user = user2
      else
        self.receiver_user = user1
      end
    end
  end
end
