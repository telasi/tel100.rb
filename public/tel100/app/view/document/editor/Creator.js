Ext.define('Tel100.view.document.editor.Creator', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditorcreator',

  controller: 'documenteditorcreator',
  viewModel: {
    type: 'documenteditorcreator'
  },
  border: false,
  layout: 'border',
  defaultListenerScope: true,

  listeners: {
    beforerender: {
      fn: 'onBeforeRender',
      scope: 'controller'
    },
    documentchange: {
      fn: 'onDocumentChange',
      buffer: 500,
      scope: 'controller'
    }
  },

  items: [{
    xtype: 'tabpanel',
    region: 'center',
    activeTab: 0,
    deferredRender: false,
    tabPosition: 'bottom',
    items: [{
      xtype: 'panel',
      border: false,
      layout: 'border',
      bodyBorder: false,
      bind: {
        title: '{i18n.document.base.ui.newDocumentTab}'
      },

      dockedItems: [{
        xtype: 'toolbar',
        region: 'north',
        dock: 'top',
        border: false,
        items: [{
          xtype: 'button',
          bind: {
            disabled: '{sendButtonDisabled}',
            text: '{i18n.document.base.ui.send}'
          },
          listeners: {
            click: {
              fn: 'onSendClick',
              scope: 'controller'
            }
          }
        }, {
          xtype: 'button',
          bind: {
            disabled: '{saveButtonDisabled}',
            text: '{saveButtonText}'
          },
          listeners: {
            click: {
              fn: 'onSaveClick',
              scope: 'controller'
            }
          }
        }, {
        xtype: 'documenteditorprintbutton',
          listeners: {
            'print': {
              fn: 'onDocumentPrintClick',
              scope: 'controller'
            }
          }
        }, {
          xtype: 'tbfill'
        }]
      }],

      items: [{
        xtype: 'container',
        flex: 1,
        region: 'center',
        baseCls: 'white-panel',
        border: false,
        padding: 5,
        layout: {
          type: 'vbox',
          align: 'stretch'
        },

        items: [{
          xtype: 'textfield',
          submitEmptyText: false,
          labelAlign: 'top',
          emptyText: 'enter document\'s subject',
          bind: {
            fieldLabel: '{i18n.document.base.subject}',
            value: '{document.subject}'
          }
        }, {
          xtype: 'htmleditor',
          flex: 1,
          itemId: 'documentBody',
          labelAlign: 'top',
          bind: {
            fieldLabel: '{i18n.document.base.body}'
          },
          listeners: {
            change: 'onHtmleditorChange'
          }
        }]
      }, {
        xtype: 'container',
        region: 'east',
        split: true,
        border: false,
        width: 400,
        layout: {
          type: 'accordion',
          hideCollapseTool: true
        },
        items: [{
          xtype: 'documenteditorgeneral',
          bind: {
            title: '{i18n.document.base.ui.generalTabTitle}'
          }
        }, {
          xtype: 'documentrelationpanel',
          itemId: 'relations'
        }, {
          xtype: 'documentmotionssigneepanel',
          listeners: {
            datachanged: 'onSigneesChanged'
          }
        }, {
          xtype: 'documentmotionsassigneepanel',
          listeners: {
            datachanged: 'onAssigneeChange'
          }
        }, {
          xtype: 'documentmotionsauthorpanel',
          listeners: {
            datachanged: 'onAuthorsChanged'
          }
        }, {
          xtype: 'documentfilepanel',
          itemId: 'files'
        }]
      }]
    }, {
      xtype: 'panel',
      border: false,
      layout: 'fit',
      bodyBorder: false,
      bind: {
        title: '{i18n.document.base.ui.motionsTabTitle}'
      },

      items: [{
        xtype: 'documentmotionsoutpanel',
        border: false,
        bodyBorder: false,
        listeners: {
          draftmotionchanged: 'onDraftmotionChanged',
          datachanged: 'onReceiversChanged'
        }
      }]
    }]
  }],

  onHtmleditorChange: function(field, newValue, oldValue, eOpts) {
    var view = field.up('documenteditorcreator');
    var vm = view.getViewModel();
    var document = vm.get('document');
    document.set('body', newValue);
  },

  onSigneesChanged: function(panel, operation, item) {
    this.down('documentmotionsoutpanel').refresh();
  },

  onAssigneeChange: function(panel, operation, item) {
    this.down('documentmotionsoutpanel').refresh();
  },

  onAuthorsChanged: function(panel, operation, item) {
    this.down('documentmotionsoutpanel').refresh();
  },

  onDraftmotionChanged: function(hasDraftMotion) {
    var vm = this.getViewModel();
    vm.set('hasDraftMotion', hasDraftMotion);
  },

  onReceiversChanged: function(panel, operation, item) {
    var signeesPanel = this.down('documentmotionssigneepanel');
    var assigneesPanel = this.down('documentmotionsassigneepanel');
    var authorPanel = this.down('documentmotionsauthorpanel');
    signeesPanel.refresh();
    assigneesPanel.refresh();
    authorPanel.refresh();
  },

  setDocument: function(doc) {
    var bodyText = this.down('#documentBody');
    var vm = this.getViewModel();
    vm.set('document', doc);
    bodyText.setValue(doc.get('body'));
  }
});
