var NONE = 0
  , CURRENT = 1
  , COMPLETED = 2
  , CANCELED = 3
  ;

var NAMES = {
  NONE: 'none',
  CURRENT: 'current',
  COMPLETED: 'completed',
  CANCELED: 'canceled'
};

module.exports = {
  NONE: NONE,
  CURRENT: CURRENT,
  COMPLETED: COMPLETED,
  CANCELED: CANCELED,

  myStatus: function(record) {
    var asOwner = record.get('as_owner');
    var asAuhtor = record.get('as_author');
    var asSignee = record.get('as_signee');
    var asAssignee = record.get('as_assignee');
    var role, status;
    if (asOwner > NONE) {
      role = 'owner';
      status = asOwner;
    } else if (asAuhtor > NONE) {
      role = 'author';
      status = asAuhtor;
    } else if (asSignee > NONE) {
      role = 'signee';
      status = asSignee;
    } else if (asAssignee > NONE) {
      role = 'assignee';
      status = asAssignee;
    }
    var statusName = role + '.' + NAMES[status];
    var name = i18n.document.user.my_status[statusName];
    var icon = 'fa-clock-o';
    var style = 'text-info';
    if (status === COMPLETED) {
      icon = 'fa-check';
      style = 'text-success';
    } else if (status === CANCELED) {
      icon = 'fa-times';
      style = 'text-danger';
    }
    return {
      name: name,
      icon: icon,
      style: style
    };
  }
};
