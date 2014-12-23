(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var currentLocale
  , preferences = require('./preferences');

var getCurrentLocale = function() {
  return currentLocale || preferences.getValue('locale', 'ka');
};

var setCurrentLocale = function(locale) {
  currentLocale = locale;
  preferences.setValue('locale', locale);
  // setAjaxExtraParams('api_locale', locale);
};

// var setCurrentUser = function(user, password) {
//   if (user && password) {
//     currentUser = user;
//     setAjaxExtraParams('api_username', user.get('username'));
//     setAjaxExtraParams('api_password', password);
//     setAjaxExtraParams('api_locale', getCurrentLocale());
//   } else {
//     currentUser = null;
//     setAjaxExtraParams('api_username', null);
//     setAjaxExtraParams('api_password', null);
//   }
// };

// var getCurrentUser = function() {
//   return currentUser;
// };

// var currentUser;

// var setAjaxExtraParams = function(key, value) {
//   var params = Ext.Ajax.getExtraParams() || {};
//   params[key] = value;
//   Ext.Ajax.setExtraParams(params);
// };

module.exports = {
  getCurrentLocale: getCurrentLocale,
  setCurrentLocale: setCurrentLocale
};

},{"./preferences":3}],2:[function(require,module,exports){
window.helpers = {
  preferences: require('./preferences'),
  i18n: require('./i18n')
};

},{"./i18n":1,"./preferences":3}],3:[function(require,module,exports){
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

},{}]},{},[2]);
