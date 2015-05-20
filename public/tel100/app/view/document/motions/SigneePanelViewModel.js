Ext.define('Tel100.view.document.motions.AssigneePanelViewModel1', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionssigneepanel',

  data: {
    assigneeCount: 0,
    selection: null
  },

  stores: {
    motions: {
      onStoreChanges: function() {
        var store = this;
        this.viewModel.set('assigneeCount', store.getCount());
        this.view.fireEvent('listchanged', store);
      },
      listeners: {
        datachanged: function() {
          this.onStoreChanges();
        }
      },
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'out',
          role: 'signee',
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
