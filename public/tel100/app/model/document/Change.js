Ext.define('Tel100.model.document.Change', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/documents/changes'
  },
  fields: [
    'name',
    'document_id',
    'created_at_f',
    'body',
    'docdate'
  ]

});
