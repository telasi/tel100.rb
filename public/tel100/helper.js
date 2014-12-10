window.Helpers = (function() {

  // Preference management: based on Ext.util.LocalStorage

  var preferenceStore;

  var getPreferenceStore = function() {
    if (!preferenceStore) {
      preferenceStore = new Ext.util.LocalStorage({
        id: 'preferences'
      });
    }
    return preferenceStore;
  };

  var getPreferenceValue = function(key, defValue) {
    var store = getPreferenceStore();
    var value = store.getItem(key);
    if (!value && typeof defValue !== 'undefined') {
      value = defValue;
    }
    return value;
  };

  var setPreferenceValue = function(key, value) {
    var store = getPreferenceStore();
    store.setItem(key, value);
  };

  // Current user & locale management.

  var currentUser;
  var currentLocale;

  var setAjaxExtraParams = function(key, value) {
    var params = Ext.Ajax.getExtraParams() || {};
    params[key] = value;
    Ext.Ajax.setExtraParams(params);
  };
  
  var setCurrentUser = function(user, password) {
    if (user && password) {
      currentUser = user;
      setAjaxExtraParams('api_username', user.get('username'));
      setAjaxExtraParams('api_password', password);
      setAjaxExtraParams('api_locale', getCurrentLocale());
    } else {
      currentUser = null;
      setAjaxExtraParams('api_username', null);
      setAjaxExtraParams('api_password', null);
    }
  };

  var getCurrentUser = function() {
    return currentUser;
  };

  var setCurrentLocale = function(locale) {
    currentLocale = locale;
    setPreferenceValue('locale', locale);
    setAjaxExtraParams('api_locale', locale);
  };

  var getCurrentLocale = function() {
    return currentLocale || getPreferenceValue('locale', 'ka');
  };

  var i18n_ = function() {
    return i18n[getCurrentLocale()];
  };
  
  // Common interface for AJAX calls.

  var errorMessage = function(error, title) {
    var titleText = title || '<i class="fa fa-times-circle"></i> ' + i18n_().errors.title;
    Ext.Msg.alert(titleText, error);
  };

  var ajaxRequest = function(opts) {
    var method = (opts && opts.method) || 'GET';
    var url    = opts && opts.url;
    var params = opts && opts.params;
    var view   = opts && opts.view;
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
          errorMessage(i18n_().errors.connection_error);
        }
      },
    }); 
  };

  return {
    i18n: i18n_,
    ajaxRequest: ajaxRequest,
    getPreferenceValue: getPreferenceValue,
    setPreferenceValue: setPreferenceValue,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    setCurrentLocale: setCurrentLocale,
    getCurrentLocale: getCurrentLocale
  };

})();

