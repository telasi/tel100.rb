Ext.define('Telasi.view.document.motions.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-motions-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  initComponent: function() {
    var personCol = {
      flex: 1,
      text: 'ადრესატი',
      renderer: function(value, metaData, record) {
        return window.Telasi.hrUtils.renderStructure(record);
      }
    };
    var resolutionCol = {
      flex: 1,
      text: 'რეზოლუცია',
      dataIndex: 'motion_text'
    };
    var duedateCol = {
      width: 100,
      text: 'ვადა',
      dataIndex: 'due_date',
      xtype: 'datecolumn'
    };
    var actionsCol = {
      xtype: 'actioncolumn',
      width: 30,
      items: [{
        icon: '/images/delete.gif',
        tooltip: 'ადრესატის წაშლა',
        scope: this,
        handler: function(grid, rowIndex) {
          grid.getStore().removeAt(rowIndex);
        }
      }]
    };
    var cols = [ personCol, resolutionCol, duedateCol, actionsCol ];
    if (this.editable) {
      duedateCol.editor = { xtype: 'datefield', allowBlank: true, format: Ext.Date.defaultFormat };
      resolutionCol.editor = { allowBlank: true };
    }
    this.columns = cols;
    this.callParent();
  },
});
