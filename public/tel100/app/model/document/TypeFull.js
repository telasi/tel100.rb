Ext.define('Tel100.model.document.TypeFull', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/documents/types',
    extraParams: {
       direction: ''
    },
  }
});
