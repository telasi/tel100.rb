(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var errorMessage = function(error, title) {
  var titleText = title || '<i class="fa fa-times-circle"></i> ' + i18n.errors.title;
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
      view.setLoading(false);
      var data = JSON.parse(response.responseText);
      if (success && data.success) {
        success(data);
      } else if (!data.success) {
        errorMessage(data.message);
      }
    },
    failure: function(response) {
      view.setLoading(false);
      if (failure) {
        failure(response);
      } else {
        errorMessage(i18n.errors.connection_error);
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
module.exports = {
  status: require('./status')
};

},{"./status":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./ajax":1,"./preferences":6}],5:[function(require,module,exports){
window.helpers = {
  ajax: require('./ajax'),
  'document': require('./document'),
  i18n: require('./i18n'),
  preferences: require('./preferences'),
  user: require('./user')
};

},{"./ajax":1,"./document":2,"./i18n":4,"./preferences":6,"./user":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./ajax":1,"./i18n":4,"./preferences":6}]},{},[5]);
