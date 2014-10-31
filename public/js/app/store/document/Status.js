Ext.define('Telasi.store.document.Status', {
  extend: 'Ext.data.Store',
  fields: [ 'id', 'name', 'icon' ],
  data: [
    { id: 'draft',     name: 'დრაფტი' },
    { id: 'sent',      name: 'გაგზავნილი' },
    { id: 'canceled',  name: 'გაუქმებული' },
    { id: 'completed', name: 'შესრულებული' },
  ]
}, function() {
  // create status store
  Ext.create('Telasi.store.document.Status', {
    storeId: 'document-statuses',
  });
});
