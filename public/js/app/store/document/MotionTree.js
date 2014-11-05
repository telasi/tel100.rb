Ext.define('Telasi.store.document.MotionTree', {
  extend: 'Ext.data.TreeStore',

  fields: ['sender_full_name'],

  proxy: {
    type: 'rest',
    reader: {
        type: 'json',
        typeProperty: 'mtype'
    },
    url: '/api/docs/motions/'
  },

  idProperty: 'id'
});