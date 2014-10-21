Ext.define('Telasi.store.Language', {
  extend: 'Ext.data.Store',
  fields: [ 'code', 'name' ],
  data: [
    { id: 'ka', name: 'ქართული' },
    { id: 'ru', name: 'Русский' },
    { id: 'en', name: 'English' },
  ]
});

Ext.create('Telasi.store.Language', {
  storeId: 'languages',
});
