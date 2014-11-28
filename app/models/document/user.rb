# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  include Document::Role
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_new, :is_changed, :status
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  before_save :update_document_motions

  def self.upsert!(doc, user, role, opts={})
    if user.present?
      params   = { document_id: doc.id, user_id: user.id }
      docuser  = ( Document::User.where(params).first || Document::User.create!(params.merge(role: role)) )
      new_role = docuser.role
      new_role = role if Document::Role.compare(new_role, role) < 0
      is_new   = opts[:is_new] || 1
      is_changed = opts[:is_changed] || is_new
      docuser.update_attributes!({
        role: new_role,
        status: opts[:status] || doc.status,
        is_new: is_new,
        is_changed: is_changed
      })
    end
  end

  def motions; Document::Motion.where(document: self.document, receiver_user: self.user) end
  def changed=(val); self.is_changed = val ? 1 : 0 end
  def changed?; self.is_changed == 1 end
  def new=(val); self.is_new = val ? 1 : 0 end
  def new?; self.is_new == 1 end

  protected

  def update_document_motions; motions.each { |motion| motion.update_attributes(is_new: self.is_new) } end
end
