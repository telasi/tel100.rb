Ext.define('Telasi.view.document.authors.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-authors-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  initComponent: function() {
    this.columns = [{
      width: 22,
      resizable: true,
      menuDisabled: true,
      sortable: false,
      dataIndex: 'icon',
      renderer: function(value) { return '<i class="fa fa-' + value + '"></i>' },
    }, {
      text: 'ავტორი',
      dataIndex: 'name',
      flex: 1,
      menuDisabled: true,
      sortable: false,
    }, {
      text: 'შენიშვნა',
      dataIndex: 'note',
      flex: 1,
      menuDisabled: true,
      sortable: false,
      editor: this.editable ? { allowBlank: true } : undefined
    }, {
      xtype: 'actioncolumn',
      width: 30,
      resizable: true,
      menuDisabled: true,
      sortable: false,
      items: [{
        icon: '/images/delete.gif',
        tooltip: 'ავტორის წაშლა',
        scope: this,
        handler: function(grid, rowIndex) {
          grid.getStore().removeAt(rowIndex);
        }
      }]
    }];
    this.callParent();
  },
});
