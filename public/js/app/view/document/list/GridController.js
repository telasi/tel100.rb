Ext.define('Telasi.view.document.list.GridController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentgrid',
  control: {
    '#': {
      celldblclick: 'cellDblClick'
    }
  },

  cellDblClick: function(table, td, cellIndex, record, tr, rowIndex, e, eOpts){
    this.fireEvent('centalgriddblclick', table, td, cellIndex, record, tr, rowIndex, e, eOpts);
  },

  init: function() {
    this.lookupReference('pagingtoolbar').setStore(this.getStore('documents'));
  }
});
