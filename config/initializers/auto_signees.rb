AUTO_SIGNEE_DOCTYPES = [ 3, 4 ] # ბრძანება, განკარგულება
AUTO_SIGNEE = 5253 # საქმის წარმოების განყოფილება
AUTO_SIGNEE_RESPONSE_TYPE = 19 # "ავტომატური ვიზირება"

AUTO_ASSIGNEE_EXCEPTION_DOCTYPES = [ 12 ] # ხელშეკრულება
AUTO_ASSIGNEE_EXCEPTION = 7 # user
AUTO_ASSIGNEE_EXCEPTION_RESPONSE_TYPE = 11 #

AUTO_SIGNEE_EXCEPTION_DOCTYPES = [ 3, 4 ] # ბრძანება, განკარგულება
AUTO_SIGNEE_EXCEPTION = 23 # user

##### ვადის გასვლით ვიზირების პარამეტრები

# დრო რომელიც ეძლევა ვიზატორს, რათა დაავიზიროს ბრძანება
AUTO_SIGN_INTERVAL = 8.working.hours
# ეს მომხმარებლები ავტომატურად არ დავიზირდება
AUTO_SIGN_SKIP_USERS = [ 2054 ]
# დოკუმენტის რომელი სახეობები შეიძლება დავიზირდეს ავტომატურად
AUTO_SIGN_DOCUMENT_TYPES = [3, 4]
# ავტომატური ვიზირების სახეობა
AUTO_SIGN_TYPE_ID = 29

AUTO_ASSIGNEES = [ { sender: 4, receiver: 9, response_type: 24 } ]

REPLY_TYPES_ASSIGNEE_EXCEPTION = [ 3, 4, 11, 12]