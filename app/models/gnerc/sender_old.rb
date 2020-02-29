# -*- encoding : utf-8 -*-
class Gnerc::SenderOld

 include Document::Direction
 include Document::Status
 include Mobile
	
 def self.appeal(doc)
     raise Sys::MyException.new('Wrong type', { error_code: 1 }) unless GNERC_TYPES.include?(doc.type_id)
     raise Sys::MyException.new('Wrong direction', { error_code: 1 }) unless doc.direction == IN
     raise Sys::MyException.new('Wrong state', { error_code: 1 }) if doc.status == DRAFT
     raise Sys::MyException.new('Wrong status', { error_code: 1 }) if doc.is_reply?
     raise Sys::MyException.new('შეიყვანეთ ადრესატი', { error_code: 1 }) if doc.assignee_motions.none?

     gnerc = doc.gnerc
     if gnerc.customer_type.present?
      party = gnerc.customer_type.constantize.find(gnerc.customer_id)
      if gnerc.customer_type == 'HR::Party'
        customer = party.customer
      elsif gnerc.customer_type == 'BS::Customer'
        customer = party.accnumb
      end
      customer = BS::Customer.where(accnumb: "#{customer}").first
     end

     if customer.blank?
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
     end

      raise Sys::MyException.new('Cant find customer', { error_code: 1 }) unless customer.present?

      file = doc.gnerc.file if doc.gnerc.present?
      raise Sys::MyException.new('Cant find file', { error_code: 1 }) unless file.present?

      content = File.read(file.full_path)
      raise Sys::MyException.new('File is zero size', { error_code: 1 }) if ( content.length == 0 )
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
                         abonent_number:      customer.accnumb || '1',
                         applicant:           customer.name,
                         applicant_address:   customer.address,
                         consumer_category:   customer.abonent_type,
                         appeal_date:         doc.docdate,
                         attach_6_1:          content,
                         attach_6_1_filename: file.original_name,
                         public_service_hall: ( doc.owner_user_id == JUSTICE_USER ) ? 1 : 0
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

      # phone = nil if phone and phone[0..2].upcase == 'OFF'

      # doc.gnerc.mobile = phone
      doc.gnerc.stage = 1
      doc.gnerc.step = Document::Gnerc::STEP_SIGNEE
      doc.gnerc.sent_at = Time.now
      doc.gnerc.save!

      # if phone.present?
      #   open('sms_phones', 'a') { |f| f.puts "#{doc.docnumber} - #{phone} start\n" }
      #   Document::Sms.first_sms!(doc, phone)
      #   open('sms_phones', 'a') { |f| f.puts "#{doc.docnumber} - #{phone} end\n" }
      # else
      #   open('sms_phones', 'a') { |f| f.puts "#{doc.docnumber} - no phone\n" }
      # end

      GnercWorkerOld.perform_async("appeal", DOCFLOW_TO_GNERC_MAP[doc.type_id], parameters)
    end

	def self.answer(doc)
      raise Sys::MyException.new('Error', { error_code: 1 }) unless doc.gnerc.present?

      sms = Document::Sms.where(answer: doc, active: 1).first
      raise Sys::MyException.new('არასწორი მობილური ნომერი. გთხოვთ ატვირთეთ ფაილი', { error_code: 1 }) if ( doc.gnerc.file.blank? && sms.blank? )
      raise Sys::MyException.new('არასწორი მობილური ნომერი. გთხოვთ ატვირთეთ ფაილი', { error_code: 1 }) if ( doc.gnerc.file.blank? && !Mobile.correct_mobile?(Mobile.compact_mobile(sms.phone)) )

      if doc.gnerc.status == 0
        raise I18n.t('models.document_base.errors.no_file') unless doc.gnerc.file.present?  
      else
        raise I18n.t('models.document_base.errors.no_file_or_sms') if ( doc.gnerc.file.blank? and sms.blank? )
      end

      if doc.gnerc.mediate == 1
        raise I18n.t('models.document_base.errors.no_file') unless doc.gnerc.file.present?  
      end

      file = doc.gnerc.file if doc.gnerc.present?

      if file.present?
        content = File.read(file.full_path)
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

          answer_gnerc = doc.gnerc
          answer_gnerc.step = Document::Gnerc::STEP_ANSWER
          if gnerc_record.present?
            answer_gnerc.gnerc_id = gnerc_record.gnerc_id
            answer_gnerc.customer_type = gnerc_record.customer_type
            answer_gnerc.customer_id = gnerc_record.customer_id
            answer_gnerc.customer_accnumb = gnerc_record.customer_accnumb
            answer_gnerc.customer_name = gnerc_record.customer_name
            answer_gnerc.customer_phone = gnerc_record.customer_phone
            answer_gnerc.customer_email = gnerc_record.customer_email
            answer_gnerc.customer_taxid = gnerc_record.customer_taxid
          end
          answer_gnerc.save!

          parameters.merge!({ mediate: 1 }) if ( doc.type_id != GNERC_TYPE6 and doc.gnerc.mediate == 1 )

          GnercWorkerOld.perform_async("answer", DOCFLOW_TO_GNERC_MAP[related.type_id], parameters)

          if related.sender_user_id == JUSTICE_USER
            if content.present?
              JusticeWorker.perform_async({ docid: related.id, docnumber: related.docnumber, name: file.original_name, content: content })
            else
              JusticeWorker.perform_async({ docid: related.id, docnumber: related.docnumber, name: 'answer.txt', content: Base64.encode64(smsrecord.text) })
            end
          end
        end
      end

      # return unless reply.present?

	      # Gnerc.perform_async("docflow_#{DOCFLOW_TO_GNERC_MAP[self.type_id]}_answer".to_sym, parameters)
	end

end