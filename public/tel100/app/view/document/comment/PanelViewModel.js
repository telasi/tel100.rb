Ext.define('Tel100.view.document.comment.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentpanel',

  data: {
    commentCount: 0
  },

  stores: {
    comments: {
      autoLoad: true,
      model: 'Tel100.model.document.Comment',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}'
        },
        url: '/api/documents/comments',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onStoreLoad'
      }
    }
  }
});
