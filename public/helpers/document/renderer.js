'use strict';

var partyModule = require('../party');
var Status = require('./status');

module.exports = {
  renderMotion: renderMotion,
  renderDocument: renderDocument
};

function get(object, property) {
  var hasGetter = (typeof object.get === 'function');
  var getSingleProperty = function(object, prop) {
    if (hasGetter) { return object.get(prop); }
    return object[prop];
  };
  if (typeof property === 'string') {
    return getSingleProperty(object, property);
  } else {
    for (var i = 0; i < property.length; i++) {
      var val = getSingleProperty(object, property[i]);
      if (val !== undefined) {
        return val;
      }
    }
  }
};

function renderMotion(record, opts) {
  var opts = opts || {};
  var as = opts.as === 'sender' ? 'sender' : 'receiver';

  var id = get(record, as + '_id');
  var userId = get(record, as + '_user_id');
  var type = get(record, as + '_type');
  var name = get(record, [as + '_name', as, 'name']);
  var dueDate = get(record, 'due_date');
  var dueIsOver = get(record, 'due_is_over');
  var status = get(record, 'status');
  var isNew = get(record, 'is_new');
  var currentStatus = get(record, 'current_status');

  // start with party name
  var text = partyLink(id, type, name);

  // reveal actual party
  var actualUser;

  if (as == 'sender') {
    actualUser = record.actual_sender;
  } else {
    actualUser = record.last_receiver;
  }

  if (actualUser && userId !== actualUser.id) {
    text = [ text, ' (',  partyLink(actualUser.id, 'Sys::User', actualUser.name) + ')' ].join('');
  }

  // adding current status
  var respType = responseTypeText(currentStatus);
  if (respType) { text = [ text, ' &mdash; ', currentStatus ].join(''); }

  // dueDate text
  var dueText = dueDateText(dueDate, dueIsOver, status);
  if (dueText) { text = [text, dueText].join(' '); }

  // statusify
  text = statusify(text, isNew, status);

  // decorate with dueDate
  if (dueDate) {
    var dueClass = '';
    if (dueIsOver) {
      dueClass = 'danger';
    } else if (status === Status.CURRENT) {
      dueClass = 'warning';
    }
    text = [ '<span class="', dueClass, '">', text, '</span>'].join('');
  }

  return text;
};

function renderDocument(record, opts) {
  var senderId = get(record, 'sender_id');
  var senderUserId = get(record, 'sender_user_id');
  var senderName = get(record, 'sender_name');
  var senderType = get(record, 'sender_type');
  var senderText = partyLink(senderId, senderType, senderName);
  var actualUser = get(record, 'actual_sender');
  var txt = '#<strong>' + record.get('docnumber') + '</strong>: ' + senderText;
  if (actualUser && actualUser.id !== senderUserId) {
    txt += ' (' + partyLink(actualUser.id, 'Sys::User', actualUser.name) + ')';
  }
  var status = get(record, 'status');
  return statusify(txt, false, status);
};

function statusify(text, isNew, status) {
  var icon;
  var decoration = Status.statusDecoration(status);
  if (isNew && status === Status.CURRENT) {
    icon = '<i class="text-danger fa fa-circle"></i>';
  } else {
    icon = '<i class="fa ' + decoration.icon + '"></i>';
  }
  return [ '<span class="', decoration.style, '">', icon, ' ', text, '</span>' ].join('');
};

function responseTypeText(respType) {
  if (!respType || respType === '--') { return null; }
  return respType;
};

var partyLink = partyModule.partyLink;

function dueDateText(dueDate, dueIsOver, status) {
  if (dueDate) {
    if (typeof dueDate === 'string') {
      dueDate = new Date(dueDate);
    }
    var dueIcon = 'fa-warning';
    if (dueIsOver) {
      dueIcon =  'fa-times-circle';
    } else if (status == Status.COMPLETED) {
      dueIcon = 'fa-check-circle';
    } else if (status == Status.CANCELED) {
      dueIcon = '';
    }
    var dueDateText = '<i class="fa ' + dueIcon + '"></i> <strong>' + Ext.Date.format(dueDate, 'd/m/Y') + '</strong>';
    var dueClass = '';
    if (dueIsOver) {
      dueClass = 'text-danger';
    } else if (status === Status.CURRENT) {
      dueClass = 'text-warning'
    }
    return [ ' <span class="', dueClass, '">', dueDateText, '</strong></span>' ].join('');
  }
};
