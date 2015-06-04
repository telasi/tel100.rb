Ext.define('Tel100.view.eflow.DocumentGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.eflowdocumentgrid',
  controller: 'eflowdocumentgrid',
  viewModel: {
    type: 'eflowdocumentgrid'
  },

  border: false,
  enableColumnHide: false,
  enableColumnMove: false,
  sortableColumns: false,
  defaultListenerScope: true,
  hideHeaders: true,

  bind: {
    store: '{documents}'
  },

  columns: [{
    xtype: 'gridcolumn',
    text: 'doc #',
    flex: 1
  }]
});

Ext.define('Tel100.view.eflow.DocumentGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.eflowdocumentgrid'
});

Ext.define('Tel100.view.eflow.DocumentGridViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.eflowdocumentgrid',

  stores: {
    documents: {
      autoLoad: true,
      model: 'Tel100.model.eflow.Motion',
      proxy: {
        type: 'ajax',
        url: '/api/eflow/motions',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }
  }
});
