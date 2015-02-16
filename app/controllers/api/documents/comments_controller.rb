# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  include Document::Status
  before_filter :validate_login

  def create
    # TODO: create operation for comment
  end
end
