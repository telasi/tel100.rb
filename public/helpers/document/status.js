var STATUS_CANCELED = -2;
var STATUS_NOT_SENT = -1;
var STATUS_DRAFT = 0;
var STATUS_CURRENT = 1;
var STATUS_COMPLETED = 2;

var ROLE_OWNER = 'owner';
var ROLE_CREATOR = 'creator';
var ROLE_AUTHOR = 'author';
var ROLE_SIGNEE = 'signee';
var ROLE_ASSIGNEE = 'assignee';

var statusDecoration = function(status, role, opts) {
  var textId, iconId, styleId, iconStyleId;
  var isMotion = opts && opts.isMotion;
  var isNew = opts && opts.isNew;
  var isChanged = opts && opts.isChanged;
  role = role || ROLE_OWNER;

  var isSignee = (role === ROLE_AUTHOR || role === ROLE_SIGNEE);
  if (typeof isMotion === 'undefined') { isMotion = false; }
  if (typeof isNew === 'undefined') { isNew = false; }
  if (typeof isChanged === 'undefined') { isChanged = false; }

  if (status === STATUS_CANCELED) {
    textId = isSignee ? 'canceled' : 'not_signed';
    iconId = 'fa-times';
    styleId = 'text-danger';
  } else if (status === STATUS_NOT_SENT) {
    textId = 'not_sent';
    iconId = 'fa-ban';
    styleId = 'text-muted';
  } else if (status === STATUS_DRAFT) {
    if (isMotion) {
      textId = isSignee ? 'to_be_signed' : 'to_be_sent';
    } else {
      textId = 'draft';
    }
    iconId = 'fa-circle-o';
    styleId = 'text-muted';
  } else if (status === STATUS_CURRENT) {
    textId = isSignee ? 'to_be_signed' : 'current';
    iconId = 'fa-clock-o';
    styleId = 'text-info';
  } else if (status === STATUS_COMPLETED) {
    textId = isSignee ? 'signed' : 'completed';
    iconId = 'fa-check';
    styleId = 'text-success';
  }
  iconStyleId = styleId;

  if (isNew) {
    iconId = 'fa-circle';
    iconStyleId = 'text-danger';
  } else if (isChanged) {
    iconId = 'fa-circle';
  }

  return {
    text: textId,
    style: styleId,
    icon: iconId,
    iconStyle: iconStyleId
  };
};

var statusFormatted = function(status, role, opts) {
  var decor = statusDecoration(status, role, opts);
  if (decor.text) {
    var icon = [
      '<span class="', decor.iconStyle, '">',
      '<i class="fa ', decor.icon, '"></i>',
      '</span>'
    ].join('');
    return [
      '<span class="', decor.style, '">',
      icon, ' ', i18n.document.base.statuses[decor.text],
      '</span>'
    ].join('');
  } else {
    return '???';
  }
};

module.exports = {
  statusDecoration: statusDecoration,
  statusFormatted: statusFormatted
};
