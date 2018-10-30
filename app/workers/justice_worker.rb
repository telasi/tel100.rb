class JusticeWorker
  require "net/http"
  require "uri"

  include Sidekiq::Worker

  def perform(parameters)
    # { docid: doc.id, docnumber: doc.docnumber, name: file.original_name, content: content }
    uri = URI.parse(JUSTICE_RESPONSE_URL)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.basic_auth JUSTICE_USERNAME, JUSTICE_PASSWORD
    request.set_form_data( parameters ) 
    response = http.request(request) 
  end
end