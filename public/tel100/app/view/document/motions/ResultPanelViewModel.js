Ext.define('Tel100.view.document.motions.ResultPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsresultpanel',

  data: {
    motionId: null,
    isResult: false,
    categoryId: null,
    text: null,
    selection: null
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
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onMotionsStoreLoad'
      }
    },

    responseTypes: {
      autoLoad: true,
      model: 'Tel100.model.document.ResponseType',
      filters: {
        property: 'role',
        value: '{receiverRole}'
      },
      proxy: {
        type: 'ajax',
        extraParams: {
          type: 'response'
        },
        url: '/api/documents/response_types',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onResponseTypesStoreLoad'
      }
    }
  },

  formulas: {
    hideResult: function(get) {
      return !get('isResult');
    },

    hideComplete: function(get) {
      return get('selection.status') !== helpers.document.status.CURRENT;
    },

    saveLabel: function(get) {
      if (get('isResult')) {
        return i18n.document.comment.actions.saveResult;
      }
      return i18n.document.comment.actions.saveComment;
    },

    receiverRole: function(get) {
      return get('selection.receiver_role') || 'owner';
    }
  }
});
