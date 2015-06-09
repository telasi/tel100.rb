module Eflow::MotionStatus
  CANCELED   = -1
  TO_BE_SENT = 0
  DRAFT      = 1
  NOT_READ   = 2
  TO_BE_SIGNED = 3
  READ       = 4
  SENT       = 5
  COMPLETED  = 6
  ARCHIVE    = 7

  RECEIVER_STATS = [CANCELED, DRAFT, NOT_READ, TO_BE_SIGNED, READ, SENT, COMPLETED, ARCHIVE]
end