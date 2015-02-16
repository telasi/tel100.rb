# -*- encoding : utf-8 -*-
class Folder::Standard

  DRAFT = 0
  INBOX_NONREAD = 1
  INBOX_READ = 2
  INBOX_RESENT = 3
  SENT = 4

  STANDARD_FOLDERS = [ DRAFT, INBOX_NONREAD, INBOX_READ, INBOX_RESENT, SENT ]

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

  def initialize(name_ka, name_ru, name_en, folder_type)
    self.name_ka = name_ka
    self.name_ru = name_ru
    self.name_en = name_en
    self.folder_type = folder_type
   end

   def self.docs(folderType, user)
   	case folderType.to_i
   		when DRAFT
   		 	Document::User.where('status = ? AND user_id = ?', Document::Status::DRAFT, user.id)
   		when INBOX_NONREAD
   			Document::User.where('status = ? AND is_new = ? AND user_id = ?', Document::Status::CURRENT, 1, user.id)
   		when INBOX_READ
   			Document::User.where('status = ? AND is_new = ? AND user_id = ?', Document::Status::CURRENT, 0, user.id)
   		when INBOX_RESENT
   		when SENT
   			Document::User.where('status = ? AND user_id = ?', Document::Status::SENT, user.id)
    end
   end
end