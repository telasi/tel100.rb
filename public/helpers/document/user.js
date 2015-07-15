var NONE = 0
  , CURRENT = 1
  , COMPLETED = 2
  , CANCELED = 3
  ;

var NAMES = {
  0: 'none',
  1: 'current',
  2: 'completed',
  3: 'canceled'
};

module.exports = {
  NONE: NONE,
  CURRENT: CURRENT,
  COMPLETED: COMPLETED,
  CANCELED: CANCELED,

  myStatus: function(record) {
    var data = record.data;
    var isDraft = data.status == helpers.document.status.DRAFT;

    var statusName, status;

    if (isDraft) {
      status = NONE;
      statusName = 'draft';
    } else if (data.is_completed) {
      if (data.as_owner > 0 || data.as_sender > 0) {
        statusName = 'completed';
      } else if (data.as_signee > 0 || data.as_author > 0) {
        statusName = 'signed';
      } else {
        statusName = 'completed';
      }
      status = COMPLETED;
    } else if (data.is_canceled) {
      if (data.as_owner > 0 || data.as_sender > 0) {
        statusName = 'canceled';
      } else if (data.as_signee > 0 || data.as_author > 0) {
        statusName = 'notsigned';
      } else {
        statusName = 'canceled';
      }
      status = CANCELED;
    } else if (data.is_current) {
      if (data.is_sent) {
        statusName = 'sent';
      } else if (data.is_forwarded) {
        statusName = 'forwarded';
      } else if (data.is_received) {
        if (data.as_author == 1) {
          statusName = 'tobeauthored';
        } else if (data.as_signee == 1) {
          statusName = 'tobesigned';
        } else if (data.as_assignee == 1) {
          statusName = 'tobedone';
        } else {
          statusName = 'current';
        }
      }
      status = CURRENT;
    }

    var name = i18n.document.user.my_status[statusName];
    var icon = 'fa-clock-o';
    var style = 'text-info';
    if (status === NONE) {
      icon = 'fa-circle-o';
      style = 'text-muted';
    } else if (status === COMPLETED) {
      icon = 'fa-check';
      style = 'text-success';
    } else if (status === CANCELED) {
      icon = 'fa-times';
      style = 'text-danger';
    }

    return {
      name: name,
      icon: icon,
      style: style,
      unread: record.get('is_new')
    };
  }
};
