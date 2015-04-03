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

  VISIBLE_STATS = [CURRENT, CANCELED, COMPLETED]
  VISIBLE_OWNER_STATS = [DRAFT, CURRENT, CANCELED, COMPLETED]

  def self.mydocs(user)
    # Document::User.where('(document_user.status IN (?) OR (document_user.status IN (?) AND document_user.role=?)) AND user_id = ?', VISIBLE_STATS, VISIBLE_OWNER_STATS, ROLE_OWNER, user.id)
    Document::User
  end

  def self.upsert!(doc, user, role, opts={})
    if user.present?
      params   = { document_id: doc.id, user_id: user.id }
      docuser  = Document::User.where(params).first
      if docuser.present?
        created = false
      else
        docuser = Document::User.create!(params)
        created = true
      end
      is_new   = opts[:is_new] || (created ? 1 : 0)
      is_changed = opts[:is_changed] || is_new
      docuser.update_attributes!({
        is_new: is_new,
        is_changed: is_changed
      })
      docuser
    end
  end

  def make_others_unread!
    docid  = self.document.id
    userid = self.user.id
    # stats  = VISIBLE_STATS
    # Document::User.where('document_id=? AND user_id!=? AND status IN (?)', docid, userid, stats).each do |docuser|
    Document::User.where('document_id=? AND user_id!=?', docid, userid).each do |docuser|
      docuser.update_attributes!(is_changed: 1)
    end
  end

  def motions; Document::Motion.where(document: self.document, receiver_user: self.user) end

  def changed?; self.is_changed == 1 end
  def new?; self.is_new == 1 end

  def forwarded?; self.is_forwarded == 1 end
  def sent?; self.is_sent == 1 end


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
