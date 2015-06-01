Ext.define('Tel100.view.eflow.DocumentGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.eflowdocumentgrid',
  // controller: 'eflowdocumentgrid',
  // viewModel: {
  //   type: 'eflowdocumentgrid'
  // },

  border: false,
  enableColumnHide: false,
  enableColumnMove: false,
  sortableColumns: false,
  // defaultListenerScope: true,
  // bind: {
  //   store: '{documents}'
  // },

  columns: [{
    xtype: 'gridcolumn',
    text: 'doc #',
    flex: 1
  }]
});
