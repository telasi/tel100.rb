var errorMessage = function(error, title) {
  var titleText = title || i18n.errors.title;
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
      if (view) { view.setLoading(false); }
      var data = JSON.parse(response.responseText);
      if (data.success === false) {
        if (failure) {
          failure(data.message || data.error);
        } else {
          errorMessage(data.message || data.error);
        }
      } else if (success) {
        success(data);
      }
    },
    failure: function(response) {
      if (view) { view.setLoading(false); }
      if (failure) {
        failure(response);
      } else {
        errorMessage('connection failure: try again latter.');
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
