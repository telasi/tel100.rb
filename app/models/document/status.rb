# -*- encoding : utf-8 -*-
module Document::Status
  # Initial status.
  NONE     = DRAFT     =  0

  # Sent status.
  PROCESS  = SENT      =  1

  # Status for completed motion or signed document.
  SIGNED   = COMPLETED =  2

  # This status can be used for a motion which lacks receiver user.
  # This status is also used for a document with no receiving users.
  NOT_SENT = -1

  # Status for cancled motion or rejected signature.
  REJECTED = CANCELED  = -2

  ALL_STATUSES = [ DRAFT, SENT, COMPLETED, NOT_SENT, CANCELED ]
  OPEN_STATUSES = ALL_STATUSES[0..1]
  CLOSED_STATUSES = ALL_STATUSES - OPEN_STATUSES

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def status_eval(opts)
      status = opts[:status] || opts[:defaul_status] || NONE
      raise "Illegal status: #{status}" unless ALL_STATUSES.include?(status)
      status
    end
  end
end
