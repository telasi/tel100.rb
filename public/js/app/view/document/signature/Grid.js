Ext.define('Telasi.view.document.signature.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-signatures-grid',
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  selModel: {
    mode: 'MULTI'
  },
  initComponent: function() {
    var groupCol = {
      width: 50,
      text: '#',
      dataIndex: 'sign_group'
    };
    var personCol = {
      flex: 1,
      text: 'ვიზატორი',
      renderer: function(value, metaData, record) {
        return window.Telasi.hrUtils.renderStructure(record);
      }
    };
    var actionsCol = {
      xtype: 'actioncolumn',
      width: 30,
      items: [{
        icon: '/images/delete.gif',
        tooltip: 'ვიზატორის წაშლა',
        scope: this,
        handler: function(grid, rowIndex) {
          var store = grid.getStore();
          // for(var i = rowIndex, l = store.data.length; i < l; i++) {
          //   var record = store.getAt(i);
          //   record.set('sign_group', record.get('sign_group') - 1);
          // }
          store.removeAt(rowIndex);
        }
      }]
    };
    var cols = [ groupCol, personCol, actionsCol ] ;
    cols = cols.map(function(col) {
      col.sortable = false;
      col.menuDisabled = true;
      return col;
    });
    this.columns = cols;
    this.callParent();
  },
});
