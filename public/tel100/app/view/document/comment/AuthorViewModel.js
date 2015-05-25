Ext.define('Tel100.view.document.comment.AuthorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentauthor',

  data: {
    response_type: helpers.api.document.responseType.complete,
    text: ''
  }
});
