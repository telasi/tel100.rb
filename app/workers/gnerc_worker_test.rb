class GnercWorkerTest
  include Sidekiq::Worker

  def perform(func, type, parameters)
  	service = "Docflow#{type}"
    model = "Docflow#{type}Test"
  	clazz = "Gnerc::#{model}".constantize
  	clazz.connection

  	if func == "appeal"
  		stage = 1
      doc = clazz.where(docid: parameters["docid"]).first || clazz.new(parameters)
  	else
  		stage = 2
  		doc = clazz.where(docid: parameters["docid"]).first
  		doc.update_attributes!(parameters.except("docid")) if doc.present?
  	end
    if doc.present?
    	doc.stage = stage
    	doc.save!
      if Gnerc::SendQueueTest.where(service: service, service_id: doc.id, stage: stage).empty?
       queue = Gnerc::SendQueueTest.new(service: service, service_id: doc.id, stage: stage, created_at: Time.now)
       queue.save!
      end
    end
  end

  # def perform(func, parameters)
  # 	client = Savon::Client.new(wsdl: "http://192.168.1.30/soap/wsdl",
  #                              convert_request_keys_to: :none,
  #                              convert_response_tags_to: :none)
  #   result = client.call(func.to_sym, message: parameters)
  # end
end