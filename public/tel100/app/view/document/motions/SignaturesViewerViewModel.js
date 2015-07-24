Ext.define('Tel100.view.document.motions.SignaturesViewerViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionssignaturesviewer',

  data: {
    signatureCount: 0
  },

  stores: {
    signatures: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}'
        },
        url: '/api/documents/motion/signatures',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onStoreLoad'
      }
    }
  }
});
