# -*- encoding : utf-8 -*-
module Gnerc::Sender
	
 def self.appeal(doc)
      motion = doc.motions.where(receiver_type: 'BS::Customer', receiver_role: 'author').first
      customer = motion.receiver if motion.present?
      if motion.blank?
        motion = doc.motions.where(receiver_type: 'HR::Party', receiver_role: 'author').first
        customer = motion.receiver.customer if motion.present?
        customer = BS::Customer.where(accnumb: "#{customer}").first
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
                         abonent_type:        1,
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
                         consumer_category:   1,
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
                         consumer_category:   1,
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
                         consumer_category:   1,
                         appeal_date:         doc.docdate,
                         attach_8_1:          content,
                         attach_8_1_filename: file.original_name
                       }
      end

      doc.gnerc.stage = 1
      doc.gnerc.sent_at = Time.now
      doc.gnerc.save!

      GnercWorker.perform_async("appeal", DOCFLOW_TO_GNERC_MAP[doc.type_id], parameters)
      # Gnerc.perform_async("docflow_#{DOCFLOW_TO_GNERC_MAP[self.type_id]}".to_sym, parameters)
    end

	def self.answer(doc)
      file = doc.gnerc.file if doc.gnerc.present?
      return unless file.present?

      reply = false

      sourcedocs = Document::Relation.where(base: doc)
      sourcedocs.each do |source|
        related = Document::Base.find(source.related_id)
        if GNERC_TYPES.include?(related.type_id)
          reply = related
        end
      end

      return unless reply.present?

	    content = File.read("#{FILES_REPOSITORY}/#{file.store_name}")
	    content = Base64.encode64(content)
	      
	    parameters = { docid: reply.id,
	                   "attach_#{DOCFLOW_TO_GNERC_MAP[doc.type_id]}_2".to_sym => content }

      doc.gnerc.stage = 2
      doc.gnerc.sent_at = Time.now
      doc.gnerc.save!

	    GnercWorker.perform_async("answer", DOCFLOW_TO_GNERC_MAP[doc.type_id], parameters)
	      # Gnerc.perform_async("docflow_#{DOCFLOW_TO_GNERC_MAP[self.type_id]}_answer".to_sym, parameters)
	end

end