Ext.define('Telasi.view.document.viewer.DocumentStore', {
  extend: 'Ext.data.Store',
  fields: ['docnumber'],
  proxy: {
    type: 'rest',
    reader: {
      type: 'json',
      typeProperty: 'mtype'
    },
    url: '/api/docs/show/'
  },
});
