Ext.define('Tel100.view.document.grid.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentgridpanel',

  data: {
    selectionCriteria: null
  },

  stores: {
    documents: {
      // autoLoad: true,
      model: 'Tel100.model.document.Base',
      proxy: {
        type: 'ajax',
        url: '/api/documents/base',
        timeout: 300000, 
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }
  }
});
