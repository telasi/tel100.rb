Ext.define('Tel100.view.document.grid.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentgridpanel'

  requires: [
    'Ext.data.Store'
  ],

  stores: {
    documents: {
      pageSize: 0,
      autoLoad: true,
      model: 'Tel100.model.document.Base'
    }
  }
});