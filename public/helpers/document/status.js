var role = require('./role');

var DRAFT = 0;
var NOT_SENT = -1;
var SENT = 1;
var CURRENT = 2;
var NOT_RECEIVED = -2;
var COMPLETED = 3;
var CANCELED = -3;

var OWNER = role.OWNER;
var CREATOR = role.CREATOR;
var AUTHOR = role.AUTHOR;
var SIGNEE = role.SIGNEE;
var ASSIGNEE = role.ASSIGNEE;

var statusDecoration = function(status, role, opts) {
  var textId, iconId, styleId, iconStyleId;
  var isMotion = opts && opts.isMotion;
  var isNew = opts && opts.isNew;
  var isChanged = opts && opts.isChanged;
  role = role || OWNER;

  var isSignee = (role === AUTHOR || role === SIGNEE);
  if (typeof isMotion === 'undefined') { isMotion = false; }
  if (typeof isNew === 'undefined') { isNew = false; }
  if (typeof isChanged === 'undefined') { isChanged = false; }

  if (status === DRAFT) {
    if (isMotion) { textId = isSignee ? 'to_be_signed' : 'to_be_sent'; }
    else { textId = 'draft'; }
    iconId = 'fa-circle-o';
    styleId = 'text-muted';
  } else if (status === SENT) {
    textId = 'sent';
    iconId = 'fa-send-o';
    styleId = 'text-info';
  } else if (status === NOT_SENT) {
    textId = 'not_sent';
    iconId = 'fa-frown-o';
    styleId = 'text-muted';
  } else if (status === CURRENT) {
    textId = isSignee ? 'to_be_signed' : 'current';
    iconId = 'fa-clock-o';
    styleId = 'text-info';
  } else if (status === NOT_RECEIVED) {
    textId = 'not_received';
    iconId = 'fa-ban';
    styleId = 'text-muted';
  } else if (status === COMPLETED) {
    textId = isSignee ? 'signed' : 'completed';
    iconId = 'fa-check';
    styleId = 'text-success';
  } else if (status === CANCELED) {
    textId = isSignee ? 'canceled' : 'not_signed';
    iconId = 'fa-times';
    styleId = 'text-danger';
  }
  iconStyleId = styleId;

  // if (isNew) {
  //   iconId = 'fa-circle';
  //   iconStyleId = 'text-danger';
  // } else if (isChanged) {
  //   iconId = 'fa-circle';
  // }

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

var motionStatusIcon = function(status, motion) {
  var role = motion.get('receiver_role');
  var decor = statusDecoration(status, role, { isMotion: true });
  return [
    '<span class="', decor.iconStyle, '">',
    '<i class="fa ', decor.icon, '"></i>',
    '</span>'
  ].join('');
};

var motionStatusRowClass = function(status, motion) {
  var role = motion.get('receiver_role');
  var decor = statusDecoration(status, role, { isMotion: true });
  return 'row-' + decor.iconStyle;
};

var documentStatusRowClass = function(status, document) {
  var role = ASSIGNEE;
  var decor = statusDecoration(status, role, { isMotion: false });
  return 'row-' + decor.iconStyle;
};

module.exports = {
  // constants
  DRAFT: DRAFT,
  SENT: SENT,
  NOT_SENT: NOT_SENT,
  CURRENT: CURRENT,
  NOT_RECEIVED: NOT_RECEIVED,
  COMPLETED: COMPLETED,
  CANCELED: CANCELED,

  // functions
  statusDecoration: statusDecoration,
  statusFormatted: statusFormatted,
  motionStatusIcon: motionStatusIcon,
  motionStatusRowClass: motionStatusRowClass,
  documentStatusRowClass: documentStatusRowClass
};
