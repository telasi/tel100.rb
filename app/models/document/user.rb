# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_read, :status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  def self.upsert!(doc, user, opts={})
    if user.present?
      params = { document_id: doc.id, user_id: user.id }
      docuser = ( Document::User.where(params).first || Document::User.create!(params) )
      docuser.status = opts[:status] || doc.status
      docuser.is_read = opts[:is_read] || 0
      docuser.updated_at = Date.new
      docuser.save!
      docuser
    end
  end
end
