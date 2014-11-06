Ext.define('Telasi.store.hr.HRData', {
  extend: 'Ext.data.TreeStore',

  proxy: {
    type: 'ajax',
    reader: {
      type: 'json',
      typeProperty: 'mtype'
    },
    url: '/api/hr/structure'
  },

  lazyFill: false
}, function() {
  Ext.create('Telasi.store.hr.HRData', { storeId: 'HRData' });
});
