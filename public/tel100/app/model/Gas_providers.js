Ext.define('Tel100.model.Gas_providers', {
  extend: 'Ext.data.Model',

  proxy: {
    type: 'rest',
    url: '/api/documents/gnerc/gas_providers'
  }
});