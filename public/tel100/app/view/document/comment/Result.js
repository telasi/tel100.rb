Ext.define('Tel100.view.document.comment.Result', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentcommentresultpanel',

  controller: 'documentcommentresultpanel',
  viewModel: {
    type: 'documentcommentresultpanel'
  },
  autoScroll: true,
  modal: true,
  width: 500,

  layout: {
    type: 'vbox',
    align: 'stretch',
    padding: 5
  },

  bind: {
    title: '{i18n.document.motion.resultPaneTitle}'
  },

  items: [{
    xtype: 'checkboxfield',
    flex: 0,
    itemId: 'is-complete',
    bind: {
      fieldLabel: '{i18n.document.comment.complete}',
      value: '{isResult}'
    }
  }, {
    xtype: 'combobox',
    tpl: '<tpl for="."><div class="x-boundlist-item">{html_name}</div></tpl>',
    flex: 0,
    itemId: 'result-types',
    editable: false,
    autoSelect: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      hidden: '{hideResult}',
      fieldLabel: '{i18n.document.comment.result}',
      value: '{categoryId}',
      store: '{responseTypes}'
    }
  }, {
    xtype: 'textareafield',
    flex: 0,
    itemId: 'comment-text',
    bind: {
      fieldLabel: '{i18n.document.comment.text}',
      value: '{text}'
    }
  }, {
    xtype: 'button',
    margin: 8,
    width: 728,
    bind: {
      text: '{saveLabel}'
    },
    listeners: {
      click: 'onSaveClick'
    }
  }, {
    xtype: 'documentrelationanswer',
    flex: 1
  }]

});

Ext.define('Tel100.view.document.comment.ResultViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentcommentresultpanel',

  onSaveClick: function(button, e, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();
    var docs = vm.get('selectedDocuments');
    var text = vm.get('text');
    var isComplete = vm.get('isResult');
    if (isComplete && vm.get('hideComplete')) { isComplete = false; }
    var responseTypeId = null;
    if (isComplete) { responseTypeId = vm.get('categoryId'); }

    if (!isComplete && !text) {
      Ext.Msg.show({
        title: i18n.document.comment.errors.text_required_title,
        message: i18n.document.comment.errors.text_required,
        buttons: Ext.Msg.OK,
      });
      return;
    }

    for(var i = 0; i < docs.length; i++){
      var doc = docs[i];
      var incoming = doc.get('incoming')[0];
      var motionId = incoming.id;

      if(doc.get('as_owner') === 1 ) { motionId = null; }

      var params = {
        document_id: doc.id,
        motion_id: motionId,
        is_result: isComplete,
        text: text,
        response_type_id: responseTypeId
      };

      helpers.api.document.comment.create({
        params: params,
        success: function(data) {
        },
        failure: function(error) {
          console.error(error);
        }
      });

    };

    this.getView().close();

  },

  onResponseTypesStoreLoad: function(store, records, successful, eOpts) {
    var view = this.getView();
    var combo = view.down('#result-types');
    var val = store.getAt(0);
    combo.select(val);
  }
});

Ext.define('Tel100.view.document.comment.ResultViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentresultpanel',

  data: {
    selectedDocuments: null,
    motionId: null,
    isResult: false,
    categoryId: null,
    text: null,
    selection: null
  },

  stores: {
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
     receiverRole: function(get) {
       var selDocs = get('selectedDocuments');
       var motions = selDocs[0].get('incoming');
       var motion = motions[0];
       return motion.receiver_role || 'owner';
     },

     hideResult: function(get) {
       return !get('isResult');
     },

     saveLabel: function(get) {
       if (get('isResult')) {
         return i18n.document.comment.actions.saveResult;
       }
       return i18n.document.comment.actions.saveComment;
     },
  }
});
