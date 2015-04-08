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
    docs = Document::User.mydocs(user)
   	case folderType.to_i
   		when DRAFT
   		 	docs.joins("JOIN document_base on document_base.id = document_user.document_id AND
                              document_base.status = 0 AND user_id = #{user.id}")
      when INBOX
        docs.where(is_received: 1, is_completed: show_completed)
   		when INBOX_NONREAD
   			docs.where(is_received: 1, is_completed: show_completed, is_new: 1)
   		when INBOX_READ
   			docs.where(is_received: 1, is_completed: show_completed, is_new: 0)
   		when INBOX_RESENT
        docs.where(is_forwarded: 1, is_completed: show_completed)
   		when SENT
   			docs.where(is_sent: 1, is_completed: show_completed)
      when COMPLETED
        docs.where(is_completed: 1)
      when CANCELED
        docs.where(is_canceled: 1)
    end
   end
end