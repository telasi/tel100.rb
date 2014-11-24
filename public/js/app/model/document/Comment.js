Ext.define('Telasi.model.document.Comment', {
  extend: 'Telasi.model.Base',

  requires: [
    'Telasi.model.Base'
  ],

  fields: [
    { name: 'id', type: 'int' },
    { name: 'document_id', type: 'int' },
    { name: 'user_id', type: 'int' },
    { name: 'status', type: 'int' },
    { name: 'operation' },
    { name: 'text' },
    { name: 'created_at', type: 'date' }
  ]
});
