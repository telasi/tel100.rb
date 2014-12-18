Ext.define('Telasi.store.document.Type', {
  extend: 'Ext.data.Store',
  model: 'Telasi.model.document.Type',
  proxy: {
    type: 'ajax',
    url: '/api/documents/types',
    reader: {
      type: 'json',
      rootProperty: 'types'
    }
  },
  autoLoad: true
}, function() {
  // create type store
  Ext.create('Telasi.store.document.Type', {
    storeId: 'documentTypes'
  });
});
