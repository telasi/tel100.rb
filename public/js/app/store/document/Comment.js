Ext.define('Telasi.store.document.Comment', {
  extend: 'Ext.data.Store',
  requires: [
    'Telasi.model.document.Comment'
  ],
  model: 'Telasi.model.document.Comment',
  proxy: {
    type: 'ajax',
    url: '/api/docs/comments',
    reader: {
      type: 'json',
      // rootProperty: 'comments'
    }
 },
}, function() {
  Ext.create('Telasi.store.document.Comment', {
    storeId: 'document-comments',
  });
});
