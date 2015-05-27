# -*- encoding : utf-8 -*-
module ResponseTypesHelper
  include Document::ResponseTypeDirection

  def response_type_directions
    {
      SEND => Document::ResponseType.direction_name(SEND),
      RESP_COMPLETE => Document::ResponseType.direction_name(RESP_COMPLETE),
      RESP_CANCEL => Document::ResponseType.direction_name(RESP_CANCEL)
    }
  end

  def response_type_roles
    {
      ROLE_OWNER => ROLE_OWNER,
      ROLE_SENDER => ROLE_SENDER,
      ROLE_AUTHOR => ROLE_AUTHOR,
      ROLE_SIGNEE => ROLE_SIGNEE,
      ROLE_ASSIGNEE => ROLE_ASSIGNEE,
      ROLE_AUTO_ASSIGNEE => ROLE_AUTO_ASSIGNEE
    }
  end
end
