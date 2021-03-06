Ext.define('Tel100.view.document.motions.AssigneeModifyPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsassigneemodifypanel',

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
      // listeners: {
      //   datachanged: function() {
      //     this.onStoreChanges();
      //   }
      // },
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'out',
          role: 'assignee',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      }
    },
    responseTypes: {
      autoLoad: true,
      model: 'Tel100.model.document.ResponseType',
      proxy: {
        type: 'ajax',
        extraParams: {
          type: 'send',
          role: 'assignee'
        },
        url: '/api/documents/response_types',
        reader: {
          type: 'json'
        }
      }
    }
  }
});
