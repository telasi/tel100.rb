# -*- encoding : utf-8 -*-
module Document::Status 
  DOC_NONE      = 0
  DOC_CURRENT   = 1
  DOC_COMPLETED = 2
  DOC_CANCELED  = 3

  DRAFT     = 0
  SENT      = 1
  NOT_SENT  = -1
  CURRENT   = 2
  NOT_RECEIVED = -2
  COMPLETED = 3
  CANCELED  = -3

  TEMPLATES_COMMON     = 8
  TEMPLATE_PRIVATE     = 9

  ALL_STATUSES = [ NOT_SENT, DRAFT, SENT, CURRENT, COMPLETED, CANCELED, TEMPLATES_COMMON, TEMPLATE_PRIVATE ]
  OPEN_STATUSES = [ DRAFT, SENT, CURRENT ]
  CLOSED_STATUSES = ALL_STATUSES - OPEN_STATUSES
  TEMPLATE_STATUSES = [ TEMPLATES_COMMON ]

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
