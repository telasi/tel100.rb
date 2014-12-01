Ext.define('Telasi.view.document.signature.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-signatures-grid',
  requires: [ 'Telasi.store.document.SignatureRole' ],
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  scroll: 'vertical',
  selModel: {
    mode: 'MULTI'
  },
  store: {
    fields: [
      'receiver_id',
      'receiver_type',
      'receiver_role',
      { name: 'ordering', type: 'number' },
      'name',
      'organization',
      'image'
    ],
  },
  initComponent: function() {
    var roleCol = {
      width: 75,
      text: 'როლი',
      dataIndex: 'receiver_role',
      renderer: function(value, metaData, record) {
        return window.Telasi.documentUtils.getSignatureRole(value).get('name');
      },
    };

    var personCol = {
      flex: 1,
      text: 'ხელმომწერი',
      renderer: function(value, metaData, record) {
        return window.Telasi.hrUtils.renderStructure(record);
      }
    };

    var orderCol = {
      width: 50,
      text: 'ეტაპი',
      dataIndex: 'ordering'
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
          var curr = store.getAt(rowIndex);
          var curr_group = curr.get('sign_group');
          for(var i = 0, l = store.data.length; i < l; i++) {
            var record = store.getAt(i);
            var sign_group = record.get('sign_group');
            if (sign_group > curr_group) {
              record.set('sign_group', sign_group - 1);
            }
          }
          store.removeAt(rowIndex);
        }
      }]
    };

    if (this.editable) {
      orderCol.editor = { xtype: 'numberfield', allowBlank: false, minValue: 1, maxValue: 99 };
      roleCol.editor = {
        xtype: 'combo',
        store: 'document-signature-roles',
        displayField: 'name',
        valueField: 'id',
      };
    }

    var cols = this.shortColumns ? [ orderCol, personCol ] : [ orderCol, roleCol, personCol ] ;

    if (this.editable) {
      cols.push(actionsCol);
    }

    cols = cols.map(function(col) {
      col.sortable = false;
      col.menuDisabled = true;
      return col;
    });

    this.columns = cols;
    this.callParent();
  }
});
