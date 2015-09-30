# -*- encoding : utf-8 -*-
class Folder::Standard
  DRAFT = 0
  INBOX = 1
  INBOX_UNREAD = 2
  INBOX_READ = 3
  INBOX_RESENT = 4
  INBOX_SIGNEE = 5
  INBOX_SIGNED = 6
  CHANGED = 7
  SENT = 8
  COMPLETED = 9
  CANCELED = 10
  ALL = 11

  STANDARD_FOLDERS = [ DRAFT, INBOX_UNREAD, INBOX_READ, INBOX_RESENT, CHANGED, SENT, COMPLETED, CANCELED, ALL ]

  attr_accessor :id
  attr_accessor :parent_id
  attr_accessor :icon
  attr_accessor :name_ka
  attr_accessor :name_ru
  attr_accessor :name_en
  attr_accessor :folder_type

  # getter
  define_method("name") do
    self.send("name_#{I18n.locale}") || self.send("name_#{I18n.default_locale}")
  end

  # setter
  define_method("name=") do |value|
    self.send("name_#{I18n.locale}=", value)
  end

  def initialize(id, parent_id, icon, name_ka, name_ru, name_en, folder_type)
    self.id = id
    self.parent_id = parent_id
    self.icon = icon
    self.name_ka = name_ka
    self.name_ru = name_ru
    self.name_en = name_en
    self.folder_type = folder_type
  end

  def to_hash(user)
    docs = Document::User.mydocs(user)
    { name:      self.name,
      icon:      self.icon,
      count:      Folder::Standard.docs(docs, self.folder_type, show_completed = 0, user).count,
      folder_type: self.folder_type,
      parent_id: self.parent_id
    }
  end

  def self.docs(docs, folderType, show_completed = 0, user)
    case folderType.to_i
      when DRAFT
        docs.joins("JOIN document_base on document_base.id = document_user.document_id AND document_base.status = 0")
      when INBOX
        docs.where(is_received: 1, is_completed: 0)
      when INBOX_UNREAD
        # docs.where(is_received: 1, is_completed: 0, is_forwarded: 0, is_new: 1).where('as_signee = 0 and as_author = 0')
        docs.where(is_received: 1, is_new: 1).where('as_signee = 0 and as_author = 0')
      when INBOX_READ
        docs.where(is_received: 1, is_completed: 0, is_forwarded: 0, is_new: 0).where('as_signee = 0 and as_author = 0')
      when INBOX_RESENT
        docs.where(is_received: 1, is_completed: 0, is_forwarded: 1)
      when INBOX_SIGNEE
        # docs.where('document_user.is_completed = ? and ( document_user.as_signee = 1 or document_user.as_author = 1)', 0)
        docs.where(is_received: 1, is_completed: 0).where('as_signee = 1 or as_author = 1')
      when INBOX_SIGNED
        docs.where('as_signee IN (?)', [Document::User::DOC_COMPLETED, Document::User::DOC_CANCELED])
      when CHANGED
        docs.where(is_changed: 1)
      when SENT
        docs.where(is_sent: 1)
      when COMPLETED
        docs.where(is_completed: 1)
      when CANCELED
        docs.where(is_canceled: 1)
      when ALL
        docs
    end
  end
end
