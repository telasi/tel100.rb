# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  include Document::Role
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_read, :status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  before_save :update_document_motions

  def self.upsert!(doc, user, role, opts={})
    if user.present?
      params = { document_id: doc.id, user_id: user.id }
      docuser = ( Document::User.where(params).first || Document::User.create!(params.merge(role: role)) )
      new_role = docuser.role
      new_role = role if Document::Role.compare(new_role, role) < 0
      docuser.update_attributes!({
        role: new_role,
        status: opts[:status] || doc.status,
        is_read: opts[:is_read] || 0
      })
    end
  end

  private

  def update_document_motions
    Document::Motion.where(document: self.document, receiver_user: self.user).each do |motion|
      motion.update_attributes!({ is_read: self.is_read })
    end
  end
end
