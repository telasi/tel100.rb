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
