Ext.define('Tel100.view.document.comment.ResultDialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentcommentresultdialog',

  controller: 'documentcommentresultdialog',
  viewModel: {
    type: 'documentcommentresultdialog'
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
    xtype: 'combobox',
    tpl: '<tpl for="."><div class="x-boundlist-item">{html_name}</div></tpl>',
    flex: 0,
    itemId: 'result-types',
    editable: false,
    autoSelect: false,
    displayField: 'name',
    valueField: 'id',
    autoLoad: true,
    bind: {
      hidden: '{isComment}',
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
  }]
});

Ext.define('Tel100.view.document.comment.ResultDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentcommentresultdialog',

  onSaveClick: function(button, e, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    var docId = vm.get('document').id;
    var motionId = vm.get('motion.id');
    var text = vm.get('text');
    var isResult = !vm.get('isComment');
    var responseTypeId = vm.get('categoryId');

    var params = {
      document_id: docId,
      motion_id: motionId,
      is_result: isResult,
      text: text,
      response_type_id: responseTypeId
    };

    if (!params.is_result && !params.text) {
      Ext.Msg.show({
        title: i18n.document.comment.errors.text_required_title,
        message: i18n.document.comment.errors.text_required,
        buttons: Ext.Msg.OK,
      });
      return;
    }

    view.setLoading(true);

    helpers.api.document.comment.create({
      params: params,
      success: function(data) {
        view.fireEvent('commentadded');
        view.close();
      },
      failure: function(error) {
        view.setLoading(false);
        console.error(error);
      }
    });
  },

  onResponseTypesStoreLoad: function(store, records, successful, eOpts) {
    var view = this.getView();
    var combo = view.down('#result-types');
    var val = store.getAt(0);
    combo.select(val);
  }
});

Ext.define('Tel100.view.document.comment.ResultDialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentresultdialog',

  data: {
    document: null,
    motion: null,
    operation: null,
    categoryId: null,
    text: null
  },

  stores: {
    responseTypes: {
      autoLoad: true,
      model: 'Tel100.model.document.ResponseType',
      filters: [{
        property: 'role',
        value: '{receiverRole}'
      }, {
        property: 'direction',
        value: '{direction}'
      }],
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
      var doc = get('document');
      var motion = get('motion');
      if (motion) {
        return motion.get('receiver_role');
      } else {
        return 'owner';
      }
    },

    direction: function(get) {
      var operation = get('operation');
      if (operation == 'accept') {
        return 2;
      } else if (operation == 'cancel') {
        return 3;
      }
      return 0;
    },

    isComment: function(get) {
      var operation = get('operation');
      return operation == 'comment';
    },

    saveLabel: function(get) {
      if (get('isComment')) {
        return i18n.document.comment.actions.saveComment;
      }
      return i18n.document.comment.actions.saveResult;
    },
  }
});
