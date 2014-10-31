# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Status
  include Document::Who

  self.table_name  = 'document_base'
  self.sequence_name = 'docbase_seq'

  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  belongs_to :author_user, class_name: 'Sys::User', foreign_key: 'author_user_id'
  belongs_to :author, polymorphic: true
  belongs_to :sender_user, class_name: 'Sys::User', foreign_key: 'sender_user_id'
  belongs_to :sender, polymorphic: true
  belongs_to :owner_user, class_name: 'Sys::User', foreign_key: 'owner_user_id'
  belongs_to :owner,  polymorphic: true
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'
  has_one :text, class_name: 'Document::Text', foreign_key: 'document_id'

  validates :type, presence: { message: 'აარჩიეთ სახეობა' }
  validates :direction, presence: { message: 'აარჩიეთ მიმართულება' }
  validates :subject, presence: { message: 'ჩაწერეთ სათაური' }
  validates :status, presence: { message: 'მიუთითეთ სტატუსი' }

  def body; self.text.body if self.text.present? end

  def body=(text)
    self.text = Document::Text.new if self.text.blank?
    self.text.body = text
  end

  def self.docnumber_eval(type, date)
    last_doc = Document::Base.where(docdate: date).order('id DESC').first
    last_number = '1'
    last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
    "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
  end

  def self.new_document(sender_user, opts = {})
    raise 'sender not defined' if sender_user.blank?
    sender = whose_user(sender_user)

    status = status_eval(opts)

    author_user, author = who_eval(:author, opts)
    owner_user, owner = who_eval(:owner, opts)
    ( owner_user = sender_user ; owner = sender ) if owner_user.blank?

    subject = opts[:subject] ; body = opts[:body]
    type = Document::Type.find(opts[:type_id])
    date = opts[:docdate] || Date.today
    numb = docnumber_eval(type, date)
    direction = opts[:direction] || 'inner'
    page_count = opts[:page_count] || 0 ; additions_count = opts[:additions_count] || 0

    Document::Base.transaction do
      doc = Document::Base.create!({
        type: type, direction: direction, docnumber: numb,
        docdate: date, docyear: date.year,
        subject: subject, body: body, status: status,
        author_user: author_user, author: author,
        sender_user: sender_user, sender: sender,
        owner_user: owner_user, owner: owner,
        page_count: page_count, additions_count: additions_count
      })
      (opts[:motions_attributes] || opts[:motions]).each do |motion_opts|
        motion_opts[:receiver_type] = 'HR::Employee'
        receiver_user, receiver = who_eval(:receiver, motion_opts)
        motion_text = motion_opts[:motion_text]
        due_date = motion_opts[:due_date]
        if due_date
          doc.due_date = due_date if (doc.due_date.blank? or doc.due_date < due_date)
          doc.alarm_date = due_date if (doc.alarm_date.blank? or doc.alarm_date > due_date)
        end
        motion = Document::Motion.create!({
          document: doc, status: status,
          sender_user: sender_user, sender: sender, sender_is_read: 1,
          receiver_user: receiver_user, receiver: receiver, receiver_is_read: 0,
          motion_text: motion_text, due_date: due_date
        })
      end
      doc.save!
      doc
    end
  end
end
