Ext.define('Telasi.store.document.Type', {
   extend: 'Ext.data.Store',
   model: 'Telasi.model.document.Type',
   proxy: {
    type: 'ajax',
    url: '/api/docs/types',
    reader: {
      type: 'json',
      rootProperty: 'types'
    }
  },
  autoLoad: true
});

Ext.create('Telasi.store.document.Type', {
  storeId: 'documentTypes',
});
