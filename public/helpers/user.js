var currentUser
  , proxyUser
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

var setProxyUser = function(userRec) {
  if (userRec) {
    proxyUser = userRec;
    ajax.setExtraParams('api_proxyid', userRec.id);
  } else {
    proxyUser = null;
    ajax.setExtraParams('api_proxyid', null);
  }
};

var getProxyUser = function() {
  return proxyUser;
};

module.exports = {
  setCurrentUser: setCurrentUser,
  getCurrentUser: getCurrentUser,
  getProxyUser: getProxyUser
};
