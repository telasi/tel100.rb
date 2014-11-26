# -*- encoding : utf-8 -*-
module Document::Status
  DRAFT         =  0
  CURRENT       =  1
  CURRENT_SIGN  =  2
  COMPLETED     =  3
  SIGNED        =  4
  NOT_SENT      = -1
  NOT_SENT_SIGN = -2
  CANCELED      = -3
  REJECTED      = -4

  ALL_STATUSES  = [ DRAFT, CURRENT, CURRENT_SIGN, COMPLETED, SIGNED, NOT_SENT, NOT_SENT_SIGN, CANCELED, REJECTED ]

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
