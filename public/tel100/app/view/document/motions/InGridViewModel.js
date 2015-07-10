Ext.define('Tel100.view.document.motions.InGridViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsingrid',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  data: {
    selection: null,
    activeMotion: null
  },

  stores: {
    motions: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'in',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion/motions_for_resend',
        reader: {
          type: 'json'
        }
      }
    }
  }
});
