Ext.define('Tel100.view.document.motions.AssigneeAddDialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsassigneeadddialog',

  data: {
    document: null,
    selection: null,
    outSelection: null
  },

  stores: {
    incoming: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}',
          mode: 'in'
        },
        url: '/api/documents/motion/motions_for_resend',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onStoreLoad'
      }
    },

    outgoing: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}',
          parent_id: '{selection.id}'
        },
        url: '/api/documents/motion/assignees_out',
        reader: {
          type: 'json'
        }
      },
      filters: {
        property: 'parent_id',
        value: '{parentId}'
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
  },

  formulas: {
    parentId: function(get) {
      var id = get('selection.id');
      if (typeof id === 'number') {
        return id;
      } else {
        return null;
      }
    }
  }
});
