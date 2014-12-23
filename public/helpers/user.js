var currentUser
  , ajax = require('./ajax')
  ;

var setCurrentUser = function(user, password) {
  if (user && password) {
    currentUser = user;
    ajax.setExtraParams('api_username', user.get('username'));
    ajax.setExtraParams('api_password', password);
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
