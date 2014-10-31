Ext.define('Telasi.store.document.MotionTree', {
  extend: 'Ext.data.TreeStore',
  proxy: {
     type: 'memory',
     reader: {
         type: 'json'
     },
  },

});
