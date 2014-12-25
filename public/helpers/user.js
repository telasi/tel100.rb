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
