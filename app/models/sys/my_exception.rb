class Sys::MyException < StandardError
  attr_accessor :object

  def initialize(message = nil, object = nil)
    super(message)
    self.object = object
  end
end