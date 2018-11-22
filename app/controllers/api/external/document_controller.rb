# -*- encoding : utf-8 -*-
class Api::External::DocumentController < ApiController
  before_filter :validate_login

  def justice

  	justice_user = Sys::User.find(JUSTICE_USER)

    docparams = { sender_user: justice_user, sender: nil,
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

  	Document::Base.transaction do
       doc = Document::Base.create!(docparams)
       motionparams = { document_id: doc.id, is_new: 0, ordering: 0,
         sender_user: justice_user, sender: nil, actual_sender: justice_user,
         receiver_user: justice_user, receiver: justice_user, receiver_role: Document::Role::ROLE_SENDER, 
         status: Document::Status::DRAFT,
         created_at: Time.now, sent_at: Time.now, received_at: Time.now}
       Document::Motion.create!(motionparams)

       motionparams[:receiver_role] = Document::Role::ROLE_SIGNEE
       motionparams[:ordering] = Document::Motion::ORDERING_SINGEE
       Document::Motion.create!(motionparams)
       Document::User.create!(document_id: doc.id, user_id: justice_user.id, is_new: 0, is_changed: 0).calculate!

       author = BS::Customer.where(accnumb: params[:accnumb]).first

       raise 'No customer' if author.blank?

       authorparams = { document_id: doc.id, is_new: 0, ordering: Document::Motion::ORDERING_AUTHOR,
         sender_user: justice_user, sender: justice_user, actual_sender: justice_user,
         receiver_user_id: nil, receiver_id: author.id, receiver_type: 'BS::Customer', 
         receiver_role: Document::Role::ROLE_AUTHOR, status: Document::Status::DRAFT,
         created_at: Time.now, sent_at: Time.now, received_at: Time.now}
       Document::Motion.create!(authorparams)

       doc.motions.order('ordering ASC, id ASC').each { |motion| motion.send_draft!(justice_user)}

       JSON.parse(params[:files]).each do |paramfile|
         storename = (0..63).map{ |x| '0123456789abcdef'[rand(16)] }.join
         f = Document::File.new(document: doc, original_name: paramfile["name"], store_name: storename, created_at: Time.now, folder: Time.now.strftime('%Y%m'))
         folder = File.join(FILES_REPOSITORY, Time.now.strftime('%Y%m'))
         FileUtils.mkdir_p(folder)
         File.open(f.full_path, 'wb') do |file|
             file.write(Base64.decode64(paramfile["content"]))
         end

         f.save!
        end

       doc.save!

       docid = doc.id
       docnumber = doc.docnumber
     end

     render json: { success: true, id: docid, number: docnumber }
   rescue StandardError => e
    render json: { success: false, message: e.inspect }
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

end