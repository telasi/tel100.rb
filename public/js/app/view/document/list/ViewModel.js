Ext.define('Telasi.view.document.list.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.list-document-view-model',
  requires: [
    'Telasi.model.document.Base'
  ],
  stores:{
    documents: {
      model: 'Telasi.model.document.Base',
      proxy: {
        type: 'ajax',
        reader: {
          type: 'json',
          typeProperty: 'mtype'
        },
        url: '/api/docs'
      },
      autoLoad: true,
    }
  }
});
