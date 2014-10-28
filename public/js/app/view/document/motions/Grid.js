Ext.define('Telasi.view.document.motions.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-motions-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  store: {
    fields: ['id', 'name', 'motionText']
  },
  columns: [{
    text: 'ადრესატი',
    dataIndex: 'name',
    width: 300,
    menuDisabled: true,
    sortable: false,
  }, {
    text: 'ტექსტი',
    dataIndex: 'motionText',
    flex: 1,
    editor: { allowBlank: true },
    menuDisabled: true,
    sortable: false,
  }, {
    xtype: 'actioncolumn',
    width: 30,
    sortable: false,
    menuDisabled: true,
    items: [{
      icon: '/images/delete.gif',
      tooltip: 'ადრესატის წაშლა',
      scope: this,
      handler: function(grid, rowIndex) {
        grid.getStore().removeAt(rowIndex);
      }
    }]
  }],
});
