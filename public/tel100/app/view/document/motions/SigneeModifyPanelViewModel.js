Ext.define('Tel100.view.document.motions.SigneeModifyPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionssigneemodifypanel',

  data: {
    assigneeCount: 0,
    selection: null
  },

  stores: {
    motions: {
      // onStoreChanges: function() {
      //   var store = this;
      //   this.viewModel.set('assigneeCount', store.getCount());
      //   this.view.fireEvent('listchanged', store);
      // },
      //listeners: {
      //  datachanged: function() {
           // this.onStoreChanges();
      //   }
      //},
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'out',
          role: 'signee',
          modify: 'true',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      }
    }
  }
});
