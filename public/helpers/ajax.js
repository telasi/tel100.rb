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
