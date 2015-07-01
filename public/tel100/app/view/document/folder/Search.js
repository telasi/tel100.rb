Ext.define('Tel100.view.document.folder.Search', {
  extend: 'Ext.form.Panel',
  alias: 'widget.documentfoldersearch',

  controller: 'documentfoldersearch',

  viewModel: {
    type: 'documentfoldersearch'
  },

  autoScroll: true,
  bodyPadding: 10,
  url: '/api/documents/base/search',

  items: [{
    xtype: 'combobox',
    anchor: '100%',
    name: 'folder',
    editable: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.search.folder}',
      store: '{standardFolders}'
    }
  }, {
    xtype: 'combobox',
    anchor: '100%',
    name: 'type',
    editable: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.search.type}',
      store: '{types}'
    }
  }, {
    xtype: 'combobox',
    anchor: '100%',
    name: 'direction',
    editable: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.search.direction}',
      store: '{direction}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'subject',
    bind: {
      fieldLabel: '{i18n.document.search.subject}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'body',
    bind: {
      fieldLabel: '{i18n.document.search.body}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'original_number',
    bind: {
      fieldLabel: '{i18n.document.search.original_number}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'docnumber',
    bind: {
      fieldLabel: '{i18n.document.search.docnumber}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'docnumber2',
    bind: {
      fieldLabel: '{i18n.document.base.docnumber2}'
    }
  }, {
    xtype: 'spinnerfield',
    anchor: '100%',
    name: 'docyear',
    bind: {
      fieldLabel: '{i18n.document.search.docyear}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'sender',
    bind: {
      fieldLabel: '{i18n.document.search.sender}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'author',
    bind: {
      fieldLabel: '{i18n.document.search.author}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'assignee',
    bind: {
      fieldLabel: '{i18n.document.search.assignee}'
    }
  }, {
    xtype: 'textfield',
    anchor: '100%',
    name: 'signee',
    bind: {
      fieldLabel: '{i18n.document.search.signee}'
    }
  }, {
    xtype: 'fieldcontainer',
    anchor: '100%',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    bind: {
      fieldLabel: '{i18n.document.search.customer}'
    },
    items: [{
      xtype: 'textfield',
      flex: 1,
      name: 'customer'
    }, {
      xtype: 'button',
      width: 25,
      text: '...',
      listeners: {
        click: 'onChoseCustomerButtonClick'
      }
    }]
  }, {
    xtype: 'spinnerfield',
    anchor: '100%',
    name: 'page_count',
    bind: {
      fieldLabel: '{i18n.document.search.page_count}'
    }
  }, {
    xtype: 'fieldset',
    layout: 'form',
    bind: {
      title: '{i18n.document.search.docdate}'
    },
    items: [{
      xtype: 'datefield',
      name: 'docdate_from',
      format: 'd/m/Y',
      bind: {
        fieldLabel: '{i18n.document.search.from}'
      }
    }, {
      xtype: 'datefield',
      name: 'docdate_to',
      format: 'd/m/Y',
      bind: {
        fieldLabel: '{i18n.document.search.to}'
      }
    }]
  }, {
    xtype: 'button',
    width: '100%',
    bind: {
      text: '{i18n.document.search.buttons.search}'
    },
    listeners: {
      click: 'onSearchButtonClick'
    }
  }, {
    xtype: 'button',
    width: '100%',
    bind: {
      text: '{i18n.document.search.buttons.reset}'
    },
    listeners: {
      click: 'onResetButtonClick'
    }
  }, {
    xtype: 'button',
    formBind: true,
    width: '100%',
    bind: {
      text: '{i18n.document.search.buttons.savefilter}'
    },
    listeners: {
      click: 'onSaveFilterButtonClick'
    }
  }]
});
