Ext.define('Tel100.view.document.comment.SignViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentsign',

  data: {
    response_type: helpers.api.document.responseType.complete,
    text: ''
  }
});
