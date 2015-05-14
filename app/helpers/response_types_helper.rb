# -*- encoding : utf-8 -*-
module ResponseTypesHelper
  include Document::ResponseTypeDirection

  def response_type_directions()
    {
      SEND => Document::ResponseType.direction_name(SEND),
      RESP_COMPLETE => Document::ResponseType.direction_name(RESP_COMPLETE),
      RESP_CANCEL => Document::ResponseType.direction_name(RESP_CANCEL)
    }
  end
end
