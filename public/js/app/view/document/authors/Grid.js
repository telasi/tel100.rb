Ext.define('Telasi.view.document.authors.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-authors-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  initComponent: function() {
    var authorCol = {
      text: 'ავტორი',
      flex: 1,
      menuDisabled: true,
      sortable: false,
      renderer: function(value, metaData, record) {
        return window.Telasi.hrUtils.renderStructure(record);
      }
    };
    var actionsCol = {
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
    };
    var cols = [ authorCol, actionsCol ];
    this.columns = cols;
    this.callParent();
  },
});
