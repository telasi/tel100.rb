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
