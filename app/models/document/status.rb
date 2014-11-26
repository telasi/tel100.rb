# -*- encoding : utf-8 -*-
module Document::Status
  DRAFT     =  0
  CURRENT   =  1
  COMPLETED =  2
  NOT_SENT  = -1
  CANCELED  = -2

  ALL_STATUSES = [ DRAFT, CURRENT, COMPLETED, NOT_SENT, CANCELED ]
  OPEN_STATUSES = [ DRAFT, CURRENT ]
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
