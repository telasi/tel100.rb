# -*- encoding : utf-8 -*-
class Folder::Standard

  DRAFT = 0
  INBOX = 1
  INBOX_NONREAD = 2
  INBOX_READ = 3
  INBOX_RESENT = 4
  SENT = 5
  COMPLETED = 6
  CANCELED = 7

  STANDARD_FOLDERS = [ DRAFT, INBOX_NONREAD, INBOX_READ, INBOX_RESENT, SENT, COMPLETED, CANCELED ]

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
    {
      name:      self.name,
      icon:      self.icon,
      count:     self.docs(0, user).count,
      folder_type: self.folder_type,
      parent_id: self.parent_id
    }
   end

   def docs(show_completed = 0, user)
    Folder::Standard.docs(self.folder_type, show_completed, user)
   end

   def self.docs(folderType, show_completed = 0, user)
   	case folderType.to_i
   		when DRAFT
   		 	Document::User.joins("JOIN document_base on document_base.id = document_user.document_id AND
                              document_base.status = 0 AND user_id = #{user.id}")
      when INBOX
        Document::User.where('document_user.is_received = 1 AND document_user.is_completed = ? AND user_id = ?', show_completed, user.id)
   		when INBOX_NONREAD
   			Document::User.where('document_user.is_received = 1 AND document_user.is_completed = ? AND is_new = ? AND user_id = ?', show_completed, 1, user.id)
   		when INBOX_READ
   			Document::User.where('document_user.is_received = 1 AND document_user.is_completed = ? AND is_new = ? AND user_id = ?', show_completed, 0, user.id)
   		when INBOX_RESENT
        Document::User.where('is_forwarded = ? AND is_completed = ? AND user_id = ?', 1, show_completed, user.id)
   		when SENT
   			Document::User.where("is_sent = 1 AND is_completed = ? AND document_user.user_id = ?", show_completed, user.id)
      when COMPLETED
        Document::User.where('document_user.is_completed = 1 AND user_id = ?', user.id)
      when CANCELED
        Document::User.where('document_user.is_canceled = 1 AND user_id = ?', user.id)
    end
   end
end