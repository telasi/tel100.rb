# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  include Document::Role
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_read, :status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def self.upsert!(doc, user, role, opts={})
    if user.present?
      params = { document_id: doc.id, user_id: user.id }
      docuser = ( Document::User.where(params).first || Document::User.create!(params.merge(role: role)) )
      new_role = docuser.role
      new_role = role if Document::Role.compare(new_role, role) < 0
      docuser.update_attributes!({
        role: new_role,
        status: opts[:status] || doc.status,
        is_read: opts[:is_read] || 0,
        updated_at: Date.new
      })
    end
  end
end
