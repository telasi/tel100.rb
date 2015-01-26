# -*- encoding : utf-8 -*-
module Document::Status
  NOT_SENT  = -1
  DRAFT     = 0
  SENT      = 1
  CURRENT   = 2
  COMPLETED = 3
  CANCELED  = 4

  ALL_STATUSES = [ NOT_SENT, DRAFT, SENT, CURRENT, COMPLETED, CANCELED ]
  OPEN_STATUSES = [ DRAFT, SENT, CURRENT ]
  CLOSED_STATUSES = ALL_STATUSES - OPEN_STATUSES

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def status_eval(opts)
      status = opts[:status] || opts[:defaul_status] || DRAFT
      raise "Illegal status: #{status}" unless ALL_STATUSES.include?(status)
      status
    end
  end
end
