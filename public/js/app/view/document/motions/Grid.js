Ext.define('Telasi.view.document.motions.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-motions-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  store: {
    fields: [
      'receiver_id',
      'receiver_type',
      'receiver_role',
      'ordering',
      { name: 'due_date', type: 'date' },
      'name',
      'organization',
      'image',
      'is_manager'
    ],
  },
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
    var orderingCol = {
      width: 50,
      text: 'ეტაპი',
      dataIndex: 'ordering'
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
    var cols = this.shortColumns ? [ orderingCol, personCol ] : [ orderingCol, personCol, resolutionCol, duedateCol ];
    if (this.editable) {
      cols.push(actionsCol);
      duedateCol.editor = { xtype: 'datefield', allowBlank: true, format: Ext.Date.defaultFormat };
      orderingCol.editor = { xtype: 'numberfield', allowBlank: false, minValue: 1, maxValue: 999 };
      resolutionCol.editor = { allowBlank: true };
    }
    cols = cols.map(function(col) {
      col.sortable = false;
      col.menuDisabled = true;
      return col;
    });
    this.columns = cols;
    this.callParent();
  },
});
