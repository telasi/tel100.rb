# -*- encoding : utf-8 -*-
module Folders
  STANDARD = []
  STANDARD << Folder::Standard.new('დრაფტ', 'Черновики', 'Draft', Folder::Standard::DRAFT)
  STANDARD << Folder::Standard.new('შემოსული წაუკითხავი', 'Полученные/Не прочитанные', 'Inbox unread', Folder::Standard::INBOX_NONREAD)
  STANDARD << Folder::Standard.new('შემოსული წაკითხული', 'Полученные/Прочитанные', 'Inbox read', Folder::Standard::INBOX_READ)
  STANDARD << Folder::Standard.new('შემოსული გადაგზავნილი', 'Полученные/Пересланные', 'Inbox resent', Folder::Standard::INBOX_RESENT)
  STANDARD << Folder::Standard.new('გაგზავნილი', 'Посланные', 'Sent', Folder::Standard::SENT)
end