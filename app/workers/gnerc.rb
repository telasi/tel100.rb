class Gnerc
  include Sidekiq::Worker

  def perform(func, parameters)
  	client = Savon::Client.new(wsdl: "http://192.168.1.30/soap/wsdl",
                               convert_request_keys_to: :none,
                               convert_response_tags_to: :none)
    result = client.call(func.to_sym, message: parameters)
  end
end