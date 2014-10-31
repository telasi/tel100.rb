Ext.define('Telasi.view.document.motions.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-motions-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  columns: [{
    width: 22,
    resizable: true,
    menuDisabled: true,
    sortable: false,
    dataIndex: 'icon',
    renderer: function(value) {
      return '<i class="fa fa-' + value + '"></i>'
    },
  }, {
    text: 'ადრესატი',
    dataIndex: 'name',
    flex: 1,
    menuDisabled: true,
    sortable: false,
  }, {
    text: 'რეზოლუცია',
    dataIndex: 'motion_text',
    flex: 1,
    editor: { allowBlank: true },
    menuDisabled: true,
    sortable: false,
  }, {
    text: 'ვადა',
    width: 100,
    dataIndex: 'due_date',
    xtype: 'datecolumn',
    editor: {
      xtype: 'datefield',
      allowBlank: false,
      format: Ext.Date.defaultFormat,
    }
  }, {
    xtype: 'actioncolumn',
    width: 30,
    resizable: true,
    menuDisabled: true,
    sortable: false,
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
