Ext.define('Tel100.model.document.Sms', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  fields: [{
    name: 'text'
  },{
    type: 'date',
    name: 'created_at'
  }]
});
