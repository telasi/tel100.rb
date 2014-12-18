Ext.define('Tel100.view.document.type.grid.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenttypegridpanel',

  requires: [
    'Ext.data.Store'
  ],

  stores: {
    types: {
      pageSize: 0,
      autoLoad: true,
      model: 'Tel100.model.document.Type'
    }
  }

});