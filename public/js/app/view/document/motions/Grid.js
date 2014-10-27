Ext.define('Telasi.view.document.motions.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-motions-grid',
  store: {
    fields: ['id', 'icon', 'name', 'motionText']
  },
  columns: [{
    text: '',
    dataIndex: 'icon',
    width: 20,
  }, {
    text: 'ადრესატი',
    dataIndex: 'name',
    flex: 1
  }, {
    text: 'ტექსტი',
    dataIndex: 'motionText',
    flex: 1
  }]
});
