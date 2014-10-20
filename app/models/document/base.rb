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

  def body
    self.text.body if self.text.present?
  end

  def body=(text)
    self.text = Document::Text.new if self.text.blank?
    self.text.body = text
  end

  def self.new_document(sender_user, opts = {})
    raise 'sender not defined' if sender_user.blank?
    sender = whose_user(sender_user)

    status = status_eval(opts)

    author_user, author = who_eval(:author, opts)
    owner_user, owner = who_eval(:owner, opts)
    ( owner_user = sender_user ; owner = sender ) if owner_user.blank?

    subject = opts[:subject]
    body = opts[:body]
    type = Document::Type.find(opts[:type_id])

    Document::Base.transaction do
      doc = Document::Base.create({
        type: type, direction: 'inner',
        subject: subject, body: body, docnumber: '1',
        docdate: Date.today, docyear: Date.today.year,
        status: status,
        author_user: author_user, author: author,
        sender_user: sender_user, sender: sender,
        owner_user: owner_user, owner: owner,
      })

      opts[:motions_attributes].each do |motion_opts|
        motion_opts[:receiver_type] = 'HR::Employee'
        receiver_user, receiver = who_eval(:receiver, motion_opts)
        motion_text = motion_opts[:motion_text]
        motion = Document::Motion.create({
          document: doc, status: status,
          sender_user: sender_user, sender: sender, sender_is_read: 1,
          receiver_user: receiver_user, receiver: receiver, receiver_is_read: 0,
          motion_text: motion_text
        })
      end
      doc
    end
  end
end
