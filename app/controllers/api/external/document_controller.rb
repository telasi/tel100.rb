# -*- encoding : utf-8 -*-
class Api::External::DocumentController < ApiController
  before_filter :validate_login

  def justice

  	justice_user = Sys::User.find(JUSTICE_USER)

    customer_name = params[:name].present? ? params[:name].squish : nil
    accnumb = params[:accnumb].present? ? params[:accnumb].squish : nil
    phone = params[:mobile].present? ? params[:mobile].squish : nil
    email = params[:email].present? ? params[:email].squish : nil

    subject = accnumb.to_s + ' - ' + customer_name.to_s

    docparams = { sender_user: justice_user, sender: nil,
      subject: subject,
      owner_user: justice_user, 
      direction: Document::Direction::IN, status: Document::Status::CURRENT,
      docdate: Date.today, sent_at: Time.now, received_at: Time.now,
      due_date: Time.now + Document::Type.find(GNERC_TYPE6).deadline.working.days,
      actual_sender: justice_user,
      docnumber: Document::Base.docnumber_eval(GNERC_TYPE6, Date.today),
      type_id: GNERC_TYPE6
    }

    docid = nil
    docnumber = nil

    # author = BS::Customer.where(accnumb: params[:accnumb]).first
    # raise 'Customer not found' if author.blank?

  	Document::Base.transaction do
       doc = Document::Base.create!(docparams)

       # owner motion
       motionparams = { document_id: doc.id, is_new: 0, ordering: 0,
         sender_user: justice_user, sender: nil, actual_sender: justice_user,
         receiver_user: justice_user, receiver: justice_user, receiver_role: Document::Role::ROLE_SENDER, 
         status: Document::Status::DRAFT,
         created_at: Time.now, sent_at: Time.now, received_at: Time.now}
       Document::Motion.create!(motionparams)

       # owner/signee motion
       motionparams[:receiver_role] = Document::Role::ROLE_SIGNEE
       motionparams[:ordering] = Document::Motion::ORDERING_SINGEE
       Document::Motion.create!(motionparams)
       Document::User.create!(document_id: doc.id, user_id: justice_user.id, is_new: 0, is_changed: 0).calculate!

       # auto-assignee motion
       # send_type_direction = Document::ResponseTypeDirection::SEND
       # send_type = Document::ResponseType.where(direction: send_type_direction, role: Document::Role::ROLE_AUTO_ASSIGNEE).first
       # motionparams = { document_id: doc.id, is_new: 1, ordering: Document::Motion::ORDERING_AUTO_ASIGNEE,
       #    send_type: send_type, sender_user: justice_user, receiver_user_id: AUTO_SIGNEE, 
       #    receiver_role: Document::Role::ROLE_ASSIGNEE, status: Document::Status::SENT, 
       #    sent_at: Time.now, received_at: Time.now }
       # Document::Motion.create!(motionparams)
       # Document::User.create!(document_id: doc.id, user_id: AUTO_SIGNEE, is_new: 1, is_changed: 1)

       party = HR::Party.new(name_ka: customer_name,
                             address_ka: params[:address].present? ? params[:address].squish : nil, 
                             identity: params[:tin].present? ? params[:tin].squish : nil, 
                             phones: phone, 
                             customer: accnumb, 
                             email: email,
                             org_type: 1)
       party.save!

       authorparams = { document_id: doc.id, is_new: 0, ordering: Document::Motion::ORDERING_AUTHOR,
         sender_user: justice_user, sender: justice_user, actual_sender: justice_user,
         receiver_user_id: nil, receiver_id: party.id, receiver_type: 'HR::Party', 
         receiver_role: Document::Role::ROLE_AUTHOR, status: Document::Status::DRAFT,
         created_at: Time.now, sent_at: Time.now, received_at: Time.now}
       Document::Motion.create!(authorparams)

       doc.motions.order('ordering ASC, id ASC').each { |motion| motion.send_draft!(justice_user)}

       gnerc_file = nil

       JSON.parse(params[:files]).each do |paramfile|
         storename = (0..63).map{ |x| '0123456789abcdef'[rand(16)] }.join
         f = Document::File.new(document: doc, original_name: paramfile["name"], store_name: storename, created_at: Time.now, folder: Time.now.strftime('%Y%m'))
         folder = File.join(FILES_REPOSITORY, Time.now.strftime('%Y%m'))
         FileUtils.mkdir_p(folder)
         File.open(f.full_path, 'wb') do |file|
             file.write(Base64.decode64(paramfile["content"]))
         end

         f.save!

         if paramfile["type"] == 0
           gnerc_file = f
         end
        end

       gnerc = Document::Gnerc.new(document: doc, status: 1)
       gnerc.type_id = 70 if ( params[:interruption].present? && params[:interruption] == '1' )
       gnerc.file = gnerc_file
       gnerc.customer_type = 'HR::Party'
       gnerc.customer_id = party.id
       gnerc.customer_accnumb = accnumb
       gnerc.customer_name = customer_name
       gnerc.customer_phone = phone
       gnerc.customer_email = email
       gnerc.created_at = Time.now
       gnerc.save!

       doc.save!

       docid = doc.id
       docnumber = doc.docnumber
     end

     render json: { success: true, id: docid, number: docnumber, message: "" }
   rescue StandardError => e
    render json: { success: false, id: "", number: "", message: e.message }
  end

  def ussd
    document_type = case params[:issue_type]
    when 'high_reading' then GNERC_TYPE4
    else raise 'Wrong service'
    end

    sender_user = Sys::User.find(USSD_USER)
    raise 'Sender not found' unless sender_user

    accnumb = params[:accnumb].present? ? params[:accnumb].squish : nil
    customer = BS::Customer.where(accnumb: "#{accnumb}").first
    raise 'Customer not found' unless sender_user

    subject = accnumb.to_s + ' - ' + params[:issue_description].to_ka

    docparams = { sender_user: sender_user, sender: nil,
      subject: subject,
      owner_user: sender_user, 
      direction: Document::Direction::IN, status: Document::Status::CURRENT,
      docdate: Date.today, sent_at: Time.now, received_at: Time.now,
      due_date: Time.now + Document::Type.find(document_type).deadline.working.days,
      actual_sender: sender_user,
      docnumber: Document::Base.docnumber_eval(document_type, Date.today),
      type_id: document_type
    }

    docid = nil
    docnumber = nil

    Document::Base.transaction do
       doc = Document::Base.create!(docparams)

       # owner motion
       motionparams = { document_id: doc.id, is_new: 0, ordering: 0,
         sender_user: sender_user, sender: nil, actual_sender: sender_user,
         receiver_user: sender_user, receiver: sender_user, receiver_role: Document::Role::ROLE_SENDER, 
         status: Document::Status::DRAFT,
         created_at: Time.now, sent_at: Time.now, received_at: Time.now}
       Document::Motion.create!(motionparams)

       # owner/signee motion
       motionparams[:receiver_role] = Document::Role::ROLE_SIGNEE
       motionparams[:ordering] = Document::Motion::ORDERING_SINGEE
       Document::Motion.create!(motionparams)
       Document::User.create!(document_id: doc.id, user_id: sender_user.id, is_new: 0, is_changed: 0).calculate!

       authorparams = { document_id: doc.id, is_new: 0, ordering: Document::Motion::ORDERING_AUTHOR,
         sender_user: sender_user, sender: sender_user, actual_sender: sender_user,
         receiver_user_id: nil, receiver_id: customer.id, receiver_type: 'BS::Customer', 
         receiver_role: Document::Role::ROLE_AUTHOR, status: Document::Status::DRAFT,
         created_at: Time.now, sent_at: Time.now, received_at: Time.now}
       Document::Motion.create!(authorparams)

       doc.motions.order('ordering ASC, id ASC').each { |motion| motion.send_draft!(justice_user)}

       gnerc = Document::Gnerc.new(document: doc, status: 1, customer_type: 'BS::Customer', 
          customer_id: customer.id, customer_accnumb: accnumb, customer_name: customer.name, 
          customer_phone: customer.fax, customer_email: customer.email, created_at: Time.now)
       gnerc.save!

       doc.save!

       docid = doc.id
       docnumber = doc.docnumber
     end

     render json: { success: true, id: docid, number: docnumber, message: "" }
   rescue StandardError => e
    render json: { success: false, id: "", number: "", message: e.message }
  end

  def self.response(doc)
    document = self.documents.first
    query_params = { api_username:  TEL100_USERNAME,
             api_password:  TEL100_PASSWORD,
             accnumb:       self.customerNumber, 
             document_name: document.name,
             document:    document.content,
    }

    uri = URI.parse(TEL100_CREATE_URL)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.set_form_data( query_params ) 
    response = http.request(request) 
    parsed = JSON.parse(response.body)
    return parsed["id"], parsed["number"]
  end

  def first_sms
    doc = Document::Base.find(params[:docid])
    gnerc = doc.gnerc
    gnerc.gnerc_id = "G10#{params[:case_id]}F#{params[:gnerc_id]}"
    logger = Rails.logger
    logger.info "IDDD G10#{params[:case_id]}F#{params[:gnerc_id]}"
    logger.info "IDDD gnerc #{params[:gnerc_id]}"
    gnerc.save
    Document::Sms.first_sms!(doc, gnerc.customer_phone) if gnerc.customer_phone.present?
    render json: { success: true, message: "" }
  end

end