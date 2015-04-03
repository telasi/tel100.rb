# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  include Document::Role
  include Document::Status
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_new, :is_changed
  self.set_integer_columns :is_forwarded, :is_sent, :is_received
  self.set_integer_columns :is_current, :is_canceled, :is_completed
  self.set_integer_columns :as_owner, :as_assignee, :as_author, :as_signee
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  before_save :update_document_motions

  DOC_NONE = 0
  DOC_CURRENT = 1
  DOC_COMPLETE = 2
  
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
  def received?; self.is_received == 1 end

  def current?; self.is_current == 1 end
  def canceled?; self.is_canceled == 1 end
  def completed?; self.is_completed == 1 end

  def owner?; self.as_owner > 0 end
  def signee?; self.as_signee > 0 end
  def author?; self.as_author > 0 end
  def assignee?; self.as_assignee > 0 end

  def read!
    Document::User.transaction do
      self.update_columns(is_new: 0, is_changed: 0)
      self.update_document_motions
    end
  end

  def calculate!

    # 0. main relation
    rel = Document::Motion.where('document_id=? AND receiver_user_id=? AND status!=?', self.document_id, self.user_id, DRAFT)

    # 1. owner user calculation
    if self.user == self.document.owner_user
      doc_status = self.document.status
      doc_complete = ( doc_status == COMPLETED || doc_status == CANCELED )
      self.as_owner = doc_complete ? DOC_COMPLETE : DOC_CURRENT
      self.is_current = 1 if doc_status == CURRENT
      self.is_canceled = 1 if doc_status == CANCELED
      self.is_completed = 1 if doc_status == COMPLETED
      self.is_sent = 1
    end

    # 2. assignee calculation
    assignee_rel = rel.where(receiver_role: ROLE_ASSIGNEE)
    if assignee_rel.any?
      current_cnt = assignee_rel.where(status: CURRENT).count
      completed_cnt = assignee_rel.where(status: COMPLETED).count
      canceled_cnt = assignee_rel.where(status: CANCELED).count
      if current_cnt > 0
        self.as_assignee = DOC_CURRENT
      else
        self.as_assignee = DOC_COMPLETE
      end
      self.is_current = current_cnt > 0
      self.is_canceled = canceled_cnt > 0
      self.is_completed = completed_cnt > 0
      self.is_received = 1
    end

    # 2. assignee calculation
    # signee_rel = rel.where(receiver_role: ROLE_SIGNEE)

    self.save!
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
