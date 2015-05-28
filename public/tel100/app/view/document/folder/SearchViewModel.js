Ext.define('Tel100.view.document.folder.SearchViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentfoldersearch',

  stores: {
    types: {
      autoLoad: true,
      model: 'Tel100.model.document.Type'
    },

    standardFolders: {
      autoLoad: true,
      model: 'Tel100.model.folder.Standard'
    },

    direction: {
      autoLoad: true,
      model: 'Tel100.model.document.Direction',
      proxy: {
        type: 'memory',
        data: [{
          id: 'inner'
        }, {
          id: 'out'
        }, {
          id: 'in'
        }]
      }
    }
  }
});
