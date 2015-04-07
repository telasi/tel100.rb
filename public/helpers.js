(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var errorMessage = function(error, title) {
  var titleText = title || i18n.errors.title;
  Ext.Msg.alert(titleText, error);
};

var request = function(opts) {
  var method  = (opts && opts.method) || 'GET';
  var url     = opts && opts.url;
  var params  = opts && opts.params;
  var view    = opts && opts.view;
  var success = opts && opts.success;
  var failure = opts && opts.failure;

  if (view) {
    view.setLoading(true);
  }

  Ext.Ajax.request({
    url: url,
    method: method,
    params: params,
    success: function(response) {
      if (view) { view.setLoading(false); }
      var data = JSON.parse(response.responseText);
      if (data.success === false) {
        if (failure) {
          failure(data.message || data.error);
        } else {
          errorMessage(data.message || data.error);
        }
      } else if (success) {
        success(data);
      }
    },
    failure: function(response) {
      if (view) { view.setLoading(false); }
      if (failure) {
        failure(response);
      } else {
        errorMessage('connection failure: try again latter.');
      }
    },
  });
};

// var loadModel = function(name, model, viewModel) {
//   var view = viewModel.getView();
//   view.setLoading(true);
//   model.load({
//     success: function(model, operation) {
//       view.setLoading(false);
//       viewModel.set(name, model);
//     },
//     failure: function(model, operation) {
//       view.setLoading(false);
//       errorMessage(operation.error.statusText || i18n_().errors.model_loading_error);
//     },
//   });
// };

var setExtraParams = function(key, value) {
  var params = Ext.Ajax.getExtraParams() || {};
  params[key] = value;
  Ext.Ajax.setExtraParams(params);
};

module.exports = {
  request: request,
  setExtraParams: setExtraParams
};

},{}],2:[function(require,module,exports){
var ajax = require('../ajax');

var base = {
  createDraft: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/create_draft';
    ajax.request(opts);
  },

  updateDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'PUT';
    opts.url = '/api/documents/base/update_draft';
    opts.params.id = id;
    ajax.request(opts);
  },

  deleteDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/base/delete_draft';
    opts.params = { id: id };
    ajax.request(opts);
  },

  sendDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/send_draft';
    opts.params = { id: id };
    ajax.request(opts);
  }
};

var motion = {
  createDraft: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/motion/create_draft';
    ajax.request(opts);
  },

  updateDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'PUT';
    opts.url = '/api/documents/motion/update_draft';
    opts.params.id = id;
    ajax.request(opts);
  },

  deleteDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/motion/delete_draft';
    opts.params = { id: id };
    ajax.request(opts);
  },

  sendDraft: function(documentId, parentId, args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/motion/send_draft_motions';
    opts.params = { document_id: documentId, parent_id: parentId };
    ajax.request(opts);
  }
};

var comment = {
  create: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/comments/create';
    ajax.request(opts);
  },

  sign: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/comments/sign';
    ajax.request(opts);
  }
};

var file = {
  delete: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/files/delete';
    opts.params = { id: id };
    ajax.request(opts);
  },
};

var relation = {
  create: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/relations/create';
    ajax.request(opts);
  },

  delete: function(args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/relations/delete';
    ajax.request(opts);
  }
};

var print = {
  card: function(id, args){
    var opts = args || {};
    opts.method = 'GET';
    opts.url = '/api/documents/print/card/' + id;
    ajax.request(opts);
  }
};

module.exports = {
  base: base,
  motion: motion,
  comment: comment,
  file: file,
  relation: relation,
  print: print
};

},{"../ajax":1}],3:[function(require,module,exports){
module.exports = {
  document: require('./document'),
  substitude: require('./substitude')
};
},{"./document":2,"./substitude":4}],4:[function(require,module,exports){
var ajax = require('../ajax');

var setSubstitude = function(substitude){
  ajax.setExtraParams('substitude', substitude);
};

module.exports = {
  setSubstitude: setSubstitude
};
},{"../ajax":1}],5:[function(require,module,exports){
module.exports = {
  status: require('./status'),
  role: require('./role'),
  motion: require('./motion')
};

},{"./motion":6,"./role":7,"./status":8}],6:[function(require,module,exports){
var motionDialog;

var getPropertiesDialog = function(motion) {

  // create party listener if not created yet
  if (!motionDialog) {
    motionDialog = Ext.create('Tel100.view.document.motions.Properties', {
      closeAction: 'hide',
      modal: true
    });
  }

  motionDialog.setMotion(motion);

  // return dialog to the user
  return motionDialog;
};


module.exports = {
  getPropertiesDialog: getPropertiesDialog
};

},{}],7:[function(require,module,exports){
module.exports = {
  OWNER:    'owner',
  CREATOR:  'creator',
  AUTHOR:   'author',
  SIGNEE:   'signee',
  ASSIGNEE: 'assignee'
};

},{}],8:[function(require,module,exports){
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
    styleId = 'text-muted';
  } else if (status === NOT_SENT) {
    textId = 'not_sent';
    iconId = 'fa-frown-o';
    styleId = 'text-warning';
  } else if (status === CURRENT) {
    textId = isSignee ? 'to_be_signed' : 'current';
    iconId = 'fa-clock-o';
    styleId = 'text-info';
  } else if (status === NOT_RECEIVED) {
    textId = 'not_received';
    iconId = 'fa-ban';
    styleId = 'text-warning';
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

  if (isNew) {
    iconId = 'fa-circle';
    iconStyleId = 'text-danger';
  // } else if (isChanged) {
  //   iconId = 'fa-circle';
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

var motionStatusFull = function(status, motion) {
  var role;
  if (motion.get) { role = motion.get('receiver_role'); }
  else { role = motion.receiver_role; }
  return statusFormatted(status, role);
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
  motionStatusFull: motionStatusFull,
  motionStatusIcon: motionStatusIcon,
  motionStatusRowClass: motionStatusRowClass,
  documentStatusRowClass: documentStatusRowClass
};

},{"./role":7}],9:[function(require,module,exports){
var currentLocale
  , ajax = require('./ajax')
  , preferences = require('./preferences')
  ;

var getCurrentLocale = function() {
  return currentLocale || preferences.getValue('locale', 'ka');
};

var setCurrentLocale = function(locale) {
  currentLocale = locale;
  preferences.setValue('locale', locale);
  ajax.setExtraParams('api_locale', locale);
};

var resetCurrentLocale = function() {
  var locale = getCurrentLocale();
  setCurrentLocale(locale);
};

module.exports = {
  getCurrentLocale: getCurrentLocale,
  setCurrentLocale: setCurrentLocale,
  resetCurrentLocale: resetCurrentLocale
};

},{"./ajax":1,"./preferences":12}],10:[function(require,module,exports){
window.helpers = {
  ajax: require('./ajax'),
  'document': require('./document'),
  i18n: require('./i18n'),
  preferences: require('./preferences'),
  user: require('./user'),
  api: require('./api'),
  party: require('./party')
};

},{"./ajax":1,"./api":3,"./document":5,"./i18n":9,"./party":11,"./preferences":12,"./user":13}],11:[function(require,module,exports){
var partyDialog;

var getPartyDialog = function(callback) {

  // create party listener if not created yet
  if (!partyDialog) {
    partyDialog = Ext.create('Tel100.view.party.Selector', {
      title: i18n.document.motion.selectReceiver
    });
  }

  // remove all listeners
  partyDialog.clearListeners();

  // adding new listener
  partyDialog.on('selectioncomplete', callback);

  // return dialog to the user
  return partyDialog;
};

module.exports = {
  getPartyDialog: getPartyDialog
};

},{}],12:[function(require,module,exports){
var preferenceStore;

var getStore = function() {
  if (!preferenceStore) {
    preferenceStore = new Ext.util.LocalStorage({
      id: 'preferences'
    });
  }
  return preferenceStore;
};

var getValue = function(key, defValue) {
  var store = getStore();
  var value = store.getItem(key);
  if (!value && typeof defValue !== 'undefined') {
    value = defValue;
  }
  return value;
};

var setValue = function(key, value) {
  var store = getStore();
  store.setItem(key, value);
};

module.exports = {
  getValue: getValue,
  setValue: setValue
};

},{}],13:[function(require,module,exports){
var currentUser
  , ajax = require('./ajax')
  , i18n = require('./i18n')
  , preferences = require('./preferences')
  ;

var setCurrentUser = function(user, password) {
  if (user && password) {
    currentUser = user;
    preferences.setValue('username', user.get('username'));
    ajax.setExtraParams('api_username', user.get('username'));
    ajax.setExtraParams('api_password', password);
    i18n.resetCurrentLocale();
  } else {
    currentUser = null;
    ajax.setExtraParams('api_username', null);
    ajax.setExtraParams('api_password', null);
  }
};

var getCurrentUser = function() {
  return currentUser;
};

module.exports = {
  setCurrentUser: setCurrentUser,
  getCurrentUser: getCurrentUser
};

},{"./ajax":1,"./i18n":9,"./preferences":12}]},{},[10]);
