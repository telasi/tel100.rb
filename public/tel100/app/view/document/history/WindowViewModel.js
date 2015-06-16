Ext.define('Tel100.view.document.history.WindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenthistory',

  data: {
    document: null,
    change: null
  },

  stores: {
    changes: {
      autoLoad: true,
      model: 'Tel100.model.document.Change',
      proxy: {
      	type: 'ajax',
      	extraParams: {
          id: '{document.id}'
        },
        url: '/api/documents/changes',
        reader: {
          type: 'json'
        }
      }
    },
    change: {
      autoLoad: false,
      model: 'Tel100.model.document.Change',
      proxy: {
      	type: 'ajax',
        url: '/api/documents/changes/show',
        reader: {
          type: 'json'
        }
      }
    },
   }

});