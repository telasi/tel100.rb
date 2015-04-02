# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  include Document::Role
  include Document::Status
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_new, :is_changed, :status, :is_forwarded
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  before_save :update_document_motions

  MYDOC_STATS = [CURRENT, CANCELED, COMPLETED]
  MYDOC_OWNER_STATS = [DRAFT, CURRENT, CANCELED, COMPLETED]

  def self.mydocs(user)
    Document::User.where('(document_user.status IN (?) OR (document_user.status IN (?) AND document_user.role=?)) AND user_id = ?', MYDOC_STATS, MYDOC_OWNER_STATS, ROLE_OWNER, user.id)
  end

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
  def forwarded?; self.is_forwarded == 1 end
  def forwarded=(val); self.is_forwarded = val ? 1 : 0 end

  def read!
    Document::User.transaction do
      self.update_columns(is_new: 0, is_changed: 0)
      self.update_document_motions
    end
  end

  def self.filter_substitude_can_see(substitudeId)
    vac = HR::Vacation::Vacation.where(userid: substitudeId, substitude: current_user.id)
    Document::User.join(:document).where("document_base.docdate >= sysdate")
  end

  protected

  def update_document_motions
    ### XXX: do we need this?
    motions.each { |motion| motion.update_attributes!(is_new: self.is_new) }
  end
end
