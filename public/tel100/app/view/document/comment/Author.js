Ext.define('Tel100.view.document.comment.Author', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentcommentauthor',

  viewModel: {
    type: 'documentcommentauthor'
  },

  height: 250,
  width: 400,
  defaultListenerScope: true,

  layout: {
    type: 'vbox',
    align: 'stretch',
    padding: 5
  },

  bind: {
    title: '{i18n.document.comment.actions.author_document}'
  },

  items: [{
    xtype: 'segmentedbutton',
    items: [
      {
        itemId: 'sign',
        enableToggle: true,
        pressed: true,
        bind: {
          text: '{i18n.document.comment.actions.author_ok}'
        },
        listeners: {
          toggle: 'onSignToggle'
        }
      },
      {
        enableToggle: true,
        bind: {
          text: '{i18n.document.comment.actions.author_cancel}'
        }
      }
    ]
  }, {
    xtype: 'textareafield',
    flex: 1,
    itemId: 'comment',
    labelAlign: 'top',
    bind: {
      fieldLabel: '{i18n.document.comment.text}',
      value: '{text}'
    }
  }],

  dockedItems: [{
    xtype: 'toolbar',
    flex: 1,
    dock: 'bottom',
    items: [{
      xtype: 'button',
      bind: {
        text: '{i18n.ui.save}'
      },
      listeners: {
        click: 'onSaveButtonClick'
      }
    }, {
      xtype: 'tbspacer',
      flex: 1
    }, {
      xtype: 'button',
      bind: {
        text: '{i18n.ui.cancel}'
      },
      listeners: {
        click: 'onCancelButtonClick'
      }
    }]
  }],

  onSignToggle: function(button, pressed, eOpts) {
    var vm = this.getViewModel();
    vm.set('response_type', pressed ? helpers.api.document.responseType.complete : helpers.api.document.responseType.cancel);
  },

  onSaveButtonClick: function(button, e, eOpts) {
    var view = this;
    var vm = this.getViewModel();
    var text = vm.get('text');
    var response_type = vm.get('response_type');
    var document_id = vm.get('document.id');
    helpers.api.document.comment.author({
      params: {
        document_id: document_id,
        text: text,
        response_type: response_type
      },
      success: function() {
        view.fireEvent('authored');
        view.close();
      }
    });
  },

  onCancelButtonClick: function(button, e, eOpts) {
    this.close();
  }
});

Ext.define('Tel100.view.document.comment.AuthorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentauthor',

  data: {
    response_type: helpers.api.document.responseType.complete,
    text: ''
  }
});
