Ext.define('Telasi.view.document.motions.Editor', {
  extend: 'Ext.grid.Panel',
  xtype: 'documentMotionsEditor',
  controller: 'motionsEditorController',
  padding: 0,
  bodyPadding: 0,
  plugins: [
    new Ext.grid.plugin.CellEditing({ clicksToEdit: 1 }),
  ],
  requires: [
    'Telasi.view.document.motions.EditorController'
  ],
  border: false,
  scroll: 'vertical',
  store: {
    fields: ['id', 'name', 'motionText']
  },
  columns: [{
    text: 'ადრესატი',
    dataIndex: 'name',
    flex: 2,
    menuDisabled: true,
    sortable: false,
  }, {
    text: 'ტექსტი',
    dataIndex: 'motionText',
    flex: 1,
    editor: { allowBlank: true },
    menuDisabled: true,
    sortable: false,
  }],
  dockedItems: [{
    dock: 'top',
    xtype: 'toolbar',
    border: false,
    items: [{
      xtype: 'button',
      html: '<i class="fa fa-pencil"></i> ადრესატების რედაქტირება',
      handler: 'onEditMotions',
    }]
  }]
});
