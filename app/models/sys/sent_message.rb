class Sys::SentMessage < ActiveRecord::Base
  establish_connection  :bs
  self.table_name='sms.sent_messages'

  def self.send_sms(phone, text)
  	smsg = Sys::SentMessage.new
    smsg.company='MAGTI'
    smsg.receiver_mobile = '995' + phone
    smsg.text = text
    smsg.status='N'
    smsg.sent_at=Time.now
    smsg.sender_user='TelDoc'
    smsg.save
  end

end