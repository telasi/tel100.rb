Ext.define('Telasi.view.document.viewer.MotionStore', {
  extend: 'Ext.data.TreeStore',

  proxy: {
    type: 'memory',
      reader: {
        type: 'json',
        typeProperty: 'mtype'
      }
  },
});