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
  }, {
    text: 'ტექსტი',
    dataIndex: 'motionText',
    flex: 1,
    editor: { allowBlank: true }
  }]
});
