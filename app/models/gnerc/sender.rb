# -*- encoding : utf-8 -*-
module Gnerc::Sender
	
 def self.appeal(doc)
      motion = doc.motions.where(receiver_type: 'HR::Party', receiver_role: 'author').first
      if motion.present?
        customer = motion.receiver.customer 
        phone = motion.receiver.phones
      end
      customer = BS::Customer.where(accnumb: "#{customer}").first
      if customer.present? and phone.nil? 
        phone = customer.fax
      end
      if motion.blank?
        motion = doc.motions.where(receiver_type: 'BS::Customer', receiver_role: 'author').first
        if motion.present?
          customer = motion.receiver 
          phone = customer.fax
        end  
      end

      return unless motion.present?
      return unless customer.present?

      file = doc.gnerc.file if doc.gnerc.present?
      return unless file.present?

      content = File.read("#{FILES_REPOSITORY}/#{file.store_name}")
      content = Base64.encode64(content)

      case doc.type_id
        when GNERC_TYPE4
          parameters = { docid:               doc.id,
                         docyear:             doc.docyear,
                         letter_number:       doc.docnumber,
                         abonent_number:      customer.accnumb,
                         abonent:             customer.name,
                         abonent_address:     customer.address,
                         abonent_type:        customer.abonent_type,
                         letter_category:     doc.gnerc.type_id,
                         appeal_date:         doc.docdate,
                         attach_4_1:          content,
                         attach_4_1_filename: file.original_name
                       }
        when GNERC_TYPE5
          parameters = { docid:               doc.id,
                         docyear:             doc.docyear,
                         letter_number:       doc.docnumber,
                         abonent_number:      customer.accnumb,
                         abonent:             customer.name,
                         abonent_address:     customer.address,
                         consumer_category:   customer.abonent_type,
                         appeal_date:         doc.docdate,
                         attach_5_1:          content,
                         attach_5_1_filename: file.original_name
                       }
        when GNERC_TYPE6
          parameters = { docid:               doc.id,
                         docyear:             doc.docyear,
                         letter_number:       doc.docnumber,
                         abonent_number:      customer.accnumb,
                         applicant:           customer.name,
                         applicant_address:   customer.address,
                         consumer_category:   customer.abonent_type,
                         appeal_date:         doc.docdate,
                         attach_6_1:          content,
                         attach_6_1_filename: file.original_name
                       }
        when GNERC_TYPE8
          parameters = { docid:               doc.id,
                         docyear:             doc.docyear,
                         letter_number:       doc.docnumber,
                         abonent_number:      customer.accnumb,
                         abonent:             customer.name,
                         abonent_address:     customer.address,
                         consumer_category:   customer.abonent_type,
                         appeal_date:         doc.docdate,
                         attach_8_1:          content,
                         attach_8_1_filename: file.original_name
                       }
      end

      doc.gnerc.stage = 1
      doc.gnerc.sent_at = Time.now
      doc.gnerc.save!

      phone = nil if phone and phone[0..2].upcase == 'OFF'

      if phone.present?
        Document::Sms.first_sms!(doc, phone)
      end

      GnercWorker.perform_async("appeal", DOCFLOW_TO_GNERC_MAP[doc.type_id], parameters)
      # Gnerc.perform_async("docflow_#{DOCFLOW_TO_GNERC_MAP[self.type_id]}".to_sym, parameters)
    end

	def self.answer(doc)
      return unless doc.gnerc.present?
      file = doc.gnerc.file if doc.gnerc.present?
      # return unless file.present?

      if file.present?
        content = File.read("#{FILES_REPOSITORY}/#{file.store_name}")
        content = Base64.encode64(content)
      end

      # reply = false

      Document::Sms.following_sms!(doc)

      smsrecord = Document::Sms.where(answer: doc, active: 1).first

      sourcedocs = Document::Relation.where(base: doc)
      sourcedocs.each do |source|
        related = Document::Base.find(source.related_id)
        if GNERC_TYPES.include?(related.type_id) && related.direction == 'in'
          parameters = { docid: related.id }
          parameters.merge!({ "attach_#{DOCFLOW_TO_GNERC_MAP[doc.type_id]}_2".to_sym => content,
                              "attach_#{DOCFLOW_TO_GNERC_MAP[doc.type_id]}_2_filename".to_sym => file.original_name }) if content.present?
          parameters.merge!({ company_answer: smsrecord.text,
                              phone:          smsrecord.phone, 
                              affirmative:    doc.gnerc.status }) if smsrecord.present?

          gnerc_record = related.gnerc
          if gnerc_record.present?
            related.gnerc.stage = 2
            related.gnerc.sent_at = Time.now
            related.gnerc.save!
          end

          parameters.merge!({ mediate: 1 }) if ( doc.type_id != GNERC_TYPE6 and doc.gnerc.mediate == 1 )

          GnercWorker.perform_async("answer", DOCFLOW_TO_GNERC_MAP[related.type_id], parameters)
        end
      end

      # return unless reply.present?

	      # Gnerc.perform_async("docflow_#{DOCFLOW_TO_GNERC_MAP[self.type_id]}_answer".to_sym, parameters)
	end

end