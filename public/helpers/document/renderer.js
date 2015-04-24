'use strict';

var Status = require('./status');

module.exports = {
  renderMotion: renderMotion
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
  var type = get(record, as + '_type');
  var name = get(record, [as + '_name', as, 'name']);
  var dueDate = get(record, 'due_date');
  var dueIsOver = get(record, 'due_is_over');
  var status = get(record, 'status');
  var decoration = Status.statusDecoration(status);
  var isNew = get(record, 'is_new');
  var currentStatus = get(record, 'current_status');

  // name
  var text = id ? ['<a href="#" data-id="',id,'" data-class="',type,'">',name,'</a>'].join('') : name;

  // adding current status
  if (currentStatus && currentStatus !== '--') {
    text = [ text, ' &mdash; ', currentStatus ].join('');
  }

  // show dueDate
  if (dueDate) {
    if (typeof dueDate === 'string') {
      dueDate = new Date(dueDate);
    }
    var dueClass = dueIsOver ? 'text-danger' : 'text-warning';
    text = [ text,
      ' <span class="', dueClass, '"><i class="fa fa-warning"></i>',
      '<strong>', Ext.Date.format(dueDate, 'd/m/Y'),
      '</strong></span>'
    ].join('');
  }

  // statusify
  var icon;
  if (isNew && status === helpers.document.status.CURRENT) {
    icon = '<i class="text-danger fa fa-circle"></i>';
  } else {
    icon = '<i class="fa ' + decoration.icon + '"></i>';
  }
  text = [ '<span class="', decoration.style, '">', icon, ' ', text, '</span>' ].join('');

  // decorate with dueDate
  if (dueDate) {
    var dueClass = dueIsOver ? 'danger' : 'warning';
    text = [ '<span class="', dueClass, '">', text, '</span>'].join('');
  }

  return text;
};
