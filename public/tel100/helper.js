window.Helpers = (function() {

  var currentUser;
  var currentLocale;

  var setCurrentUser = function(user, password) {
    if (user && password) {
      currentUser = user;
      Ext.Ajax.setExtraParams({
        api_username: user.get('username'),
        api_password: password,
        api_locale:   getCurrentLocale()
      });
    } else {
      currentUser = null;
      Ext.Ajax.setExtraParams({
        api_username: null,
        api_password: null
      });
    }
  };

  var getCurrentUser = function() {
    return currentUser;
  };

  var setCurrentLocale = function(locale) {
    currentLocale = locale;
    Ext.Ajax.setExtraParams({
      api_locale:   getCurrentLocale()
    });
  };

  var getCurrentLocale = function() {
    return currentLocale || 'ka';
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
        if (success) {
          var data = JSON.parse(response.responseText);
          success(data);
        }
      },
      failure: function(response) {
        view.setLoading(false);
        if (failure) {
          failure(response);
        } else {
          Ext.Msg.alert('<i class="fa fa-times-circle"></i> Error', "Can't connect to server.\nCheck network connection.");
        }
      },
    }); 
  };

  return {
    ajaxRequest: ajaxRequest,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    setCurrentLocale: setCurrentLocale,
    getCurrentLocale: getCurrentLocale
  };

})();

