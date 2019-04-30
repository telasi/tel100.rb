Ext.define('Tel100.model.Gas_providers', {
  extend: 'Ext.data.Model',

  fields : [ 
      { name : 'id',
        type : 'int',
        allowNull : true,
        persist: false
    }],

    idProperty: 'foo', 

  proxy: {
    type: 'rest',
    url: '/api/documents/gnerc/gas_providers'
  }
});