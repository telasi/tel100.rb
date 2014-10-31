Ext.define('Telasi.store.document.Direction', {
  extend: 'Ext.data.Store',
  fields: [ 'code', 'name' ],
  data: [
    { id: 'inner', name: 'შიდა' },
    { id: 'in',    name: 'შემოსული' },
    { id: 'out',   name: 'გასული' },
  ]
}, function() {
  Ext.create('Telasi.store.document.Direction', {
    storeId: 'document-directions',
  });
});
