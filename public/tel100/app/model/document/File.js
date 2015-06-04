Ext.define('Tel100.model.document.File', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  fields: [{
    type: 'date',
    name: 'created_at'
  }, {
    type: 'boolean',
    name: 'deleted'
  }]
});
