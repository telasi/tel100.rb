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

  // Status decoration

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
  
  var statusDecoration = function(status, role, isMotion) {
    var textId, iconId, styleId;
    role = role || ROLE_OWNER;
    var isSignee = (role === ROLE_AUTHOR || role === ROLE_SIGNEE);
    if (typeof isMotion === 'undefined') { isMotion = false; }
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
    return [ textId, iconId, styleId ];
  };

  var statusFormatted = function(status, role, isMotion) {
    var dec = statusDecoration(status, role, isMotion);
    if (dec[0]) {
      var statusName = i18n_().document.base.statuses[dec[0]];
      var icon = '<i class="fa ' + dec[1] + '"></i>';
      return '<span class="' + dec[2] + '">' + icon + ' ' + statusName + '</span>';
    } else {
      return '???';
    }
  };
  
  // Helpers objects

  return {
    // i18n
    i18n: i18n_,
    // ajax
    ajaxRequest: ajaxRequest,
    // preferences
    getPreferenceValue: getPreferenceValue,
    setPreferenceValue: setPreferenceValue,
    // user
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    // locale
    setCurrentLocale: setCurrentLocale,
    getCurrentLocale: getCurrentLocale,
    // status
    statusDecoration: statusDecoration,
    statusFormatted: statusFormatted
  };

})();

