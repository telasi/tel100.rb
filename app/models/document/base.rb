# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Status
  include Document::Who

  self.table_name  = 'documents'
  self.sequence_name = 'documents_seq'
  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  belongs_to :author_user, class_name: 'Sys::User', foreign_key: 'author_user_id'
  belongs_to :author, polymorphic: true
  belongs_to :sender_user, class_name: 'Sys::User', foreign_key: 'sender_user_id'
  belongs_to :sender, polymorphic: true
  belongs_to :owner_user, class_name: 'Sys::User', foreign_key: 'owner_user_id'
  belongs_to :owner,  polymorphic: true
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'

  def self.new_document(opts = {})
    status = status_eval(opts)

    sender_user, sender = who_eval(:sender, opts)
    raise 'sender not defined' if (sender.blank? and sender_user.blank?)
    receiver_user, receiver, motion_text = who_eval(:receiver, opts)
    # TODO: receiver is required for non-draft documents
    author_user, author = who_eval(:author, opts)
    owner_user, owner = who_eval(:owner, opts)
    ( owner_user = sender_user ; owner = sender ) if owner_user.blank?

    subject = opts[:subject]
    body = opts[:body]

    Document::Base.transaction do
      doc = Document::Base.create({
        doctype: 'letter', direction: 'inner',
        subject: subject, body: body, docnumber: '1',
        docdate: Date.today, docyear: Date.today.year,
        status: status,
        author_user: author_user, author: author,
        sender_user: sender_user, sender: sender,
        owner_user: owner_user, owner: owner,
      })
      motion = Document::Motion.create({
        document: doc, status: status,
        sender_user: sender_user, sender: sender, sender_is_read: 1,
        receiver_user: receiver_user, receiver: receiver, receiver_is_read: 0,
        motion_text: motion_text
      })
      doc
    end
  end
end
