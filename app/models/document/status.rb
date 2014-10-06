module Document::Status
  DRAFT = 'draft'
  SENT  = 'sent'
  CANCELED = 'canceled'
  COMPLETED = 'completed'

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
      status = opts[:status] || SENT
      raise "Illegal status: #{status}" unless ALL_STATUSES.include?(status)
      status
    end
  end
end
