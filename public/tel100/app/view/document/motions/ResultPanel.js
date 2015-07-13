Ext.define('Tel100.view.document.motions.ResultPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsresultpanel',

  controller: 'documentmotionsresultpanel',
  viewModel: {
    type: 'documentmotionsresultpanel'
  },
  autoScroll: true,

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
    tpl: '<tpl for="."><div class="x-boundlist-item">{html_text}</div></tpl>',
    itemId: 'in-motions',
    editable: false,
    autoSelect: false,
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.comment.motion}',
      value: '{motionId}',
      store: '{motions}',
      selection: '{selection}'
    }
  }, {
    xtype: 'checkboxfield',
    flex: 0,
    itemId: 'is-complete',
    bind: {
      hidden: '{hideComplete}',
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
  }],

  resetForm: function() {
    var motionsCombo = this.down('#in-motions');
    var typeCombo = this.down('#result-types');
    var completeCheck = this.down('#is-complete');
    var textField = this.down('#comment-text');
    // motionsCombo.select(motionsCombo.getStore().getAt(0));
    motionsCombo.getStore().load();
    typeCombo.select(typeCombo.getStore().getAt(0));
    textField.setValue('');
    completeCheck.setValue(false);
  }
});

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

Ext.define('Tel100.view.document.motions.ResultPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsresultpanel',

  onSaveClick: function(button, e, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    var docId = vm.get('document').id;
    var motionId = vm.get('selection.id');
    if (typeof motionId !== 'number') { motionId = null; }
    var text = vm.get('text');
    var isComplete = vm.get('isResult');
    if (isComplete && vm.get('hideComplete')) { isComplete = false; }
    var responseTypeId = null;
    if (isComplete) { responseTypeId = vm.get('categoryId'); }

    var params = {
      document_id: docId,
      motion_id: motionId,
      is_result: isComplete,
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
        view.resetForm();
        view.setLoading(false);
        view.fireEvent('commentadded');
      },
      failure: function(error) {
        view.setLoading(false);
        console.error(error);
      }
    });
  },

  onMotionsStoreLoad: function(store, records, successful, eOpts) {
    var view = this.getView();
    var combo = view.down('#in-motions');
    var val = store.getAt(0);
    combo.select(val);
  },

  onResponseTypesStoreLoad: function(store, records, successful, eOpts) {
    var view = this.getView();
    var combo = view.down('#result-types');
    var val = store.getAt(0);
    combo.select(val);
  }
});
