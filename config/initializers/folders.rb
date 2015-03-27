# -*- encoding : utf-8 -*-
module Folders
  STANDARD = []
  STANDARD << Folder::Standard.new(1,nil,'<i class="fa fa-circle-o"></i>','დრაფტ', 'Черновики', 'Draft', Folder::Standard::DRAFT)
  STANDARD << Folder::Standard.new(2,nil,'<i class="fa fa-inbox"></i>', 'შემოსული', 'Полученные', 'Inbox', Folder::Standard::INBOX)
  STANDARD << Folder::Standard.new(3,2,'<i class="fa fa-envelope"></i>','წაუკითხავი', 'Не прочитанные', 'Unread', Folder::Standard::INBOX_NONREAD)
  STANDARD << Folder::Standard.new(4,2,'<i class="fa fa-envelope-o"></i>','წაკითხული', 'Прочитанные', 'Read', Folder::Standard::INBOX_READ)
  STANDARD << Folder::Standard.new(5,2,'<i class="fa fa-external-link"></i>','გადაგზავნილი', 'Пересланные', 'Resent', Folder::Standard::INBOX_RESENT)
  STANDARD << Folder::Standard.new(6,nil,'<i class="fa fa-reply"></i>','გაგზავნილი', 'Отправленные', 'Sent', Folder::Standard::SENT)
  STANDARD << Folder::Standard.new(7,nil,'<i class="fa fa-check"></i>','დასრულებული', 'Завершенные', 'Completed', Folder::Standard::COMPLETED)
  STANDARD << Folder::Standard.new(9,nil,'<i class="fa fa-times"></i>','გაუქმებული', 'Отмененные', 'Canceled', Folder::Standard::CANCELED)
end