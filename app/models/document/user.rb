# -*- encoding : utf-8 -*-
class Document::User < ActiveRecord::Base
  include Document::Role
  include Document::Status
  self.table_name  = 'document_user'
  self.primary_keys = :user_id, :document_id
  self.set_integer_columns :is_new, :is_changed, :is_shown
  self.set_integer_columns :is_forwarded, :is_sent, :is_received
  self.set_integer_columns :is_current, :is_canceled, :is_completed
  self.set_integer_columns :has_due_date, :completed_over_due
  self.set_integer_columns :as_owner, :as_assignee, :as_author, :as_signee, :as_sender
  belongs_to :document, class_name: 'Document::Base', foreign_key: 'document_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'
  before_save :update_document_motions

  def self.mydocs(user)
    @docs = Document::User.where(user: user, is_shown: 1)
    if user.current_substitude.present? and user.current_substitude.substitude_type = HR::Vacation::Vacation::VIEW_NEW
     @docs = @docs.where('document_user.created_at >= ?', user.current_substitude.from_date) 
    else
     @docs
    end
  end

  def self.upsert!(doc, user, role, opts={})
    if user.present?
      params   = { document_id: doc.id, user_id: user.id }
      docuser  = Document::User.where(params).first
      if docuser.present?
        is_new = docuser.is_new
      else
        docuser = Document::User.create!(params)
        is_new = opts[:is_new] || 1
      end
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
  def outgoing; Document::Motion.where(document: self.document, sender_user: self.user) end

  def changed?; self.is_changed == 1 end
  def new?; self.is_new == 1 end
  def shown?; self.is_shown == 1 end

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

  def due_date?; self.has_due_date == 1 end

  def due_is_over?
    return true if self.completed_over_due == 1
    if self.current_due_date.present?
      self.current_due_date < Date.today
    else
      false
    end
  end

  def read!
    Document::User.transaction do
      self.is_new = 0
      self.is_changed = 0
      self.save!
    end
  end

  def calculate!
    self.is_sent = self.is_received = self.is_forwarded = self.is_shown = 0
    self.is_current = self.is_canceled = self.is_completed = 0
    self.as_owner = self.as_sender = self.as_assignee = self.as_signee = self.as_author = DOC_NONE

    rel = Document::Motion.where('document_id=? AND receiver_user_id=? AND status!=?', self.document_id, self.user_id, DRAFT)
    calculate_owner
    calculate_sender

    # 4. assignee calculation
    assignee_rel = rel.where(receiver_role: ROLE_ASSIGNEE)
    if assignee_rel.any?
      current_cnt = assignee_rel.where(status: CURRENT).count
      completed_cnt = assignee_rel.where(status: COMPLETED).count
      canceled_cnt = assignee_rel.where(status: CANCELED).count
      if current_cnt > 0
        self.as_assignee = DOC_CURRENT
      elsif canceled_cnt > 0
        self.as_assignee = DOC_CANCELED
      elsif completed_cnt > 0
        self.as_assignee = DOC_COMPLETED
      else
        self.as_assignee = DOC_NONE
      end
      self.is_current = 1 if current_cnt > 0
      self.is_canceled = 1 if canceled_cnt > 0
      self.is_completed = 1 if completed_cnt > 0
      self.is_received = 1
    end

    # 5. signee calculation
    signee_rel = rel.where(receiver_role: ROLE_SIGNEE)
    if signee_rel.any?
      current_cnt = signee_rel.where(status: CURRENT).count
      completed_cnt = signee_rel.where(status: COMPLETED).count
      canceled_cnt = signee_rel.where(status: CANCELED).count
      if current_cnt > 0
        self.as_signee = DOC_CURRENT
      elsif canceled_cnt > 0
        self.as_signee = DOC_CANCELED
      elsif completed_cnt > 0
        self.as_signee = DOC_COMPLETED
      else
        self.as_signee = DOC_NONE
      end
      self.is_current = 1 if current_cnt > 0
      self.is_canceled = 1 if canceled_cnt > 0
      self.is_completed = 1 if completed_cnt > 0
      self.is_received = 1
    end

    # 6. author calculation
    author_rel = rel.where(receiver_role: ROLE_AUTHOR)
    if author_rel.any?
      current_cnt = author_rel.where(status: CURRENT).count
      completed_cnt = author_rel.where(status: COMPLETED).count
      canceled_cnt = author_rel.where(status: CANCELED).count
      if current_cnt > 0
        self.as_author = DOC_CURRENT
      elsif canceled_cnt > 0
        self.as_author = DOC_CANCELED
      elsif completed_cnt > 0
        self.as_author = DOC_COMPLETED
      else
        self.as_author = DOC_NONE
      end
      self.is_current = 1 if current_cnt > 0
      self.is_canceled = 1 if canceled_cnt > 0
      self.is_completed = 1 if completed_cnt > 0
      self.is_received = 1
    end

    # 7. checking is_forwarded
    forwarded_count = Document::Motion.where('document_id=? AND sender_user_id=? AND status!=? AND parent_id IS NOT NULL', self.document_id, self.user_id, DRAFT).count
    self.is_forwarded = 1 if forwarded_count > 0

    # 8. checking is_shown for non-owners
    not_draft_count = rel.where('status NOT IN (?)', [ SENT, NOT_SENT, NOT_RECEIVED ]).count
    self.is_shown = 1 if not_draft_count > 0

    # 9. calculate due date status
    current_due_date = nil ; has_due_date = 0 ; completed_over_due = 0
    self.motions.each do |motion|
      d = motion.effective_due_date
      if motion.current?
        if current_due_date.nil?
          current_due_date = d
        elsif d.present? and d < current_due_date
          current_due_date = d
        end
      elsif motion.resolved? and motion.due_is_over?
        completed_over_due = 1
      end
      has_due_date = 1 if d.present?
    end
    self.current_due_date = current_due_date
    self.completed_over_due = completed_over_due
    self.has_due_date = has_due_date

    self.save!
  end

  def self.filter_substitude_can_see(substitudeId)
    vac = HR::Vacation::Vacation.where(userid: substitudeId, substitude: current_user.id)
    Document::User.join(:document).where("document_base.docdate >= sysdate")
  end

  protected

  def update_document_motions
    if self.is_new_changed?
      motions.each { |motion| motion.update_attributes!(is_new: self.is_new) }
    end
  end

  private

  def calculate_owner
    if self.user == self.document.owner_user
      doc_status = self.document.status
      if doc_status == COMPLETED
        self.as_owner = DOC_COMPLETED
        self.is_completed = 1
      elsif doc_status == CANCELED
        self.as_owner = DOC_CANCELED
        self.is_canceled = 1
      elsif doc_status == CURRENT
        self.is_current = 1
        self.as_owner = DOC_CURRENT
      else
        self.as_owner = DOC_NONE
      end
      self.is_sent = 1 if doc_status != DRAFT
      self.is_shown = 1 if self.as_owner != DOC_NONE
    end
  end

  def calculate_sender
    rel = Document::Motion.where('document_id=? AND receiver_user_id=?', self.document_id, self.user_id)
    sender_rel = rel.where(receiver_role: ROLE_SENDER)
    if sender_rel.any?
      current_cnt   = sender_rel.where(status: CURRENT).count
      completed_cnt = sender_rel.where(status: COMPLETED).count
      canceled_cnt  = sender_rel.where(status: CANCELED).count
      if current_cnt > 0
        self.as_sender = DOC_CURRENT
      elsif canceled_cnt > 0
        self.as_sender = DOC_CANCELED
      elsif completed_cnt > 0
        self.as_sender = DOC_COMPLETED
      else
        self.as_sender = DOC_NONE
      end
      self.is_sent = 1 unless self.document.draft?
      self.is_current = 1 if current_cnt > 0
      self.is_canceled = 1 if canceled_cnt > 0
      self.is_completed = 1 if completed_cnt > 0
      self.is_shown = 1 # sender always visible
    end
  end
end
