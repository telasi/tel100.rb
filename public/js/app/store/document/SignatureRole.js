Ext.define('Telasi.store.document.SignatureRole', {
  extend: 'Ext.data.Store',
  fields: [ 'code', 'name' ],
  data: [
    { id: 'signee', name: 'ვიზატორი' },
    { id: 'author', name: 'ავტორი' },
  ]
}, function() {
  Ext.create('Telasi.store.document.SignatureRole', {
    storeId: 'document-signature-roles',
  });
});
