# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Personalize
  include Document::Status
  include Document::Role
  include Document::Who

  self.table_name  = 'document_base'
  self.sequence_name = 'docbase_seq'
  self.set_integer_columns :status

  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  personalize 'sender'
  personalize 'owner'
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
  has_one :text, class_name: 'Document::Text', foreign_key: 'document_id'
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'
  has_many :comments, class_name: 'Document::Comment', foreign_key: 'document_id'

  def body; self.text.body if self.text.present? end
  def motions_waiting; self.motions_total - self.motions_completed - self.motions_canceled end
  def draft?; self.status == DRAFT end
  def sender_name; (self.sender_user || self.sender).to_s end

  def self.docnumber_eval(type, date)
    last_doc = Document::Base.where('docdate=? AND docnumber IS NOT NULL', date).order('id DESC').first
    last_number = '1'
    last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
    "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
  end

  def self.create_draft!(sender_user)
    raise 'sender not defined' if sender_user.blank?

    sender = whose_user(sender_user)
    docparams = {
      sender_user: sender_user, sender: sender,
      owner_user: sender_user, owner: sender,
      direction: 'inner', status: DRAFT,
      type: Document::Type.order('order_by').first
    }

    Document::Base.transaction do
      doc = Document::Base.create!(docparams)
      Document::User.upsert!(doc, sender_user, ROLE_OWNER, { is_new: 0, status: CURRENT })
      doc
    end
  end

  def update_draft!(user, params)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      if params.key?(:body)
        text = self.text || Document::Text.new(document: self)
        text.body = params[:body]
        text.save!
      end
      self.update_attributes(params.permit(:subject,:type_id,:docdate,:page_count,:additions_count, :direction, :original_number, :original_date))
      self.save!
    end
  end

  def delete_draft!(user)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      self.motions.destroy_all
      self.comments.destroy_all
      self.text.destroy if self.text
      Document::User.where(document_id: self.id).destroy_all
      self.destroy
    end
  end

  def send_draft!(user)
    raise I18n.t('models.document_base.errors.no_privilege_to_send') unless user == self.owner_user
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    raise I18n.t('models.document_base.errors.empty_subject') unless self.subject.present?
    raise I18n.t('models.document_base.errors.empty_body') unless self.body.present?
    raise I18n.t('models.document_base.errors.no_motions') unless self.motions.any?
    Document::Base.transaction do
      docuser = Document::User.where(document: self, user: user).first
      self.status = docuser.status = CURRENT
      self.docdate = self.docdate || Date.today
      self.docnumber = Document::Base.docnumber_eval(self.type, self.docdate)
      self.sent_at = self.received_at = Time.now
      self.motions.order('ordering ASC, id ASC').each do |motion|
        motion.send_draft!(user)
      end
      docuser.save!
      self.save!
    end
  end

  def send_draft_motions!(user)
    raise I18n.t('models.document_base.errors.no_privilege_to_send') unless user == self.owner_user
    Document::Base.transaction do
      self.motions.where(status: DRAFT, parent_id: nil).each do |motion|
        motion.send_draft!(user)
      end
    end
  end
end
