# -*- encoding : utf-8 -*-
module Document::Status
  # signature / motion statuses
  NONE     = DRAFT     =  0
  PROCESS  = SENT      =  1
  REJECTED = CANCELED  = -1
  SIGNED   = COMPLETED =  2

  ALL_STATUSES = [ DRAFT, SENT, CANCELED, COMPLETED ]
  OPEN_STATUSES = ALL_STATUSES[0..1]
  CLOSED_STATUSES = ALL_STATUSES - OPEN_STATUSES

  def draft?; self.status == DRAFT end
  def sent?; self.status == SENT end
  def canceled?; self.canceled == CANCELED end
  def completed?; self.completed == COMPLETED end
  def open?; NEW_STATUSES.include? self.status end
  def closed?; COMPLETED_STATUSES.include? self.status end

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def status_eval(opts)
      status = opts[:status] || NONE
      raise "Illegal status: #{status}" unless ALL_STATUSES.include?(status)
      status
    end
  end
end
