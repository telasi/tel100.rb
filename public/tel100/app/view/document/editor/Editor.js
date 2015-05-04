Ext.define('Tel100.view.document.editor.Editor', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditoreditor',

  controller: 'documenteditoreditor',
  viewModel: {
    type: 'documenteditoreditor'
  },
  layout: 'border',
  defaultListenerScope: true,

  items: [{
    xtype: 'tabpanel',
    region: 'center',
    border: false,
    padding: '',
    activeTab: 0,
    deferredRender: false,
    tabPosition: 'bottom',
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      items: [{
        xtype: 'button',
        bind: {
          text: '{i18n.document.comment.actions.reply}'
        },
        listeners: {
          click: {
            fn: 'onReplyClick',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'button',
        bind: {
          text: '{i18n.document.base.ui.card}'
        },
        listeners: {
          click: {
            fn: 'onCardPrintClick',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'button',
        bind: {
          text: '{i18n.ui.print}'
        },
        listeners: {
          click: {
            fn: 'onDocumentPrintClick',
            scope: 'controller'
          }
        }
      }, {
        xtype: 'button',
        bind: {
          hidden: '{hideSignButton}',
          text: '{i18n.document.comment.actions.sign}'
        },
        listeners: {
          click: 'onSignDocument'
        }
      }, {
        xtype: 'button',
        bind: {
          hidden: '{hideAuthorButton}',
          text: '{i18n.document.comment.actions.author}'
        },
        listeners: {
          click: 'onAuthorDocument'
        }
      }]
    }],
    items: [ {
      xtype: 'panel',
      border: false,
      layout: 'border',
      bind: {
        title: '{i18n.document.base.ui.contentTabTitle}'
      },
      items: [{
        xtype: 'container',
        region: 'center',
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
          items: [ {
              xtype: 'form',
              margins: '0',
              autoScroll: true,
              border: false,
              cls: 'document-subject',
              resizable: false,
              layout: {
                type: 'vbox',
                align: 'stretch'
              },
              items: [
                {
                  xtype: 'displayfield',
                  flex: 1,
                  itemId: 'fldAuthors',
                  shrinkWrap: 2,
                  fieldStyle: 'height: inherit',
                  bind: {
                    fieldLabel: '{i18n.document.base.authors}',
                    value: '{authors}'
                  }
                },
                {
                  xtype: 'displayfield',
                  flex: 1,
                  itemId: 'fldDocumentInfo',
                  shrinkWrap: 2,
                  width: '100%',
                  fieldStyle: 'height: inherit',
                  bind: {
                    fieldLabel: '{i18n.document.base.doc}',
                    value: '{docinfo}'
                  }
                },
                {
                  xtype: 'displayfield',
                  flex: 1,
                  itemId: 'fldSignees',
                  shrinkWrap: 2,
                  fieldStyle: 'height: inherit',
                  bind: {
                    hidden: '{hideSignees}',
                    fieldLabel: '{i18n.document.base.signees}',
                    value: '{signees}'
                  }
                },
                {
                  xtype: 'displayfield',
                  flex: 1,
                  itemId: 'fldIncoming',
                  shrinkWrap: 2,
                  fieldStyle: 'height: inherit',
                  bind: {
                    hidden: '{hideIncoming}',
                    fieldLabel: '{i18n.document.base.from}',
                    value: '{incoming}'
                  }
                },
                {
                  xtype: 'displayfield',
                  flex: 1,
                  itemId: 'fldOutgoing',
                  shrinkWrap: 2,
                  fieldStyle: 'height: inherit',
                  bind: {
                    hidden: '{hideOutgoing}',
                    fieldLabel: '{i18n.document.base.to}',
                    value: '{outgoing}'
                  }
                },
                {
                  xtype: 'textfield',
                  flex: 1,
                  width: '100%',
                  editable: false,
                  bind: {
                    fieldLabel: '{i18n.document.base.subject}',
                    value: '{document.subject}'
                  }
                }
              ]
            },
            {
              xtype: 'container',
              flex: 1,
              cls: 'document-body',
              overflowY: 'scroll',
              bind: {
                html: '{document.body}'
              }
            }
          ]}, {
            xtype: 'container',
            region: 'east',
            split: true,
            width: 400,
            layout: {
              type: 'accordion',
              hideCollapseTool: true
            },
            items: [
              {
                xtype: 'documenteditorgeneral',
                bind: {
                  title: '{i18n.document.base.ui.generalTabTitle}'
                }
              },
              // {
              //   xtype: 'documentmotionssignaturesviewer'
              // },
              {
                xtype: 'documentmotionsreceiverspanel'
              },
              {
                xtype: 'documentmotionstree'
              },
              {
                xtype: 'documentmotionsresultpanel',
                listeners: {
                  commentadded: 'onPanelCommentadded'
                }
              },
              {
                xtype: 'documentcommentpanel'
              },
              {
                xtype: 'documentfilepanel'
              },
              {
                xtype: 'documentrelationpanel'
              }
            ]
          }
        ]
      },
      {
        xtype: 'panel',
        border: false,
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        bind: {
          title: '{i18n.document.base.ui.motionsTabTitle}'
        },
        items: [
          {
            xtype: 'documentmotionsinpanel',
            flex: 1,
            listeners: {
              motionchanged: {
                fn: 'onInMotionChanged',
                scope: 'controller'
              }
            }
          },
          {
            xtype: 'splitter',
            width: 5
          },
          {
            xtype: 'documentmotionsoutpanel',
            border: false,
            flex: 1
          }
        ]
      }
    ]
  }],
  listeners: {
    destroy: {
      fn: 'onDestroy',
      scope: 'controller'
    },
    afterrender: {
      fn: 'onContainerAfterRender',
      scope: 'controller'
    }
  },

  onSignDocument: function(button, e, eOpts) {
    var view = this;
    var vm = view.getViewModel();
    var doc = vm.get('document');
    var dialog = Ext.create('Tel100.view.document.comment.Sign', { modal: true });
    dialog.getViewModel().set('document', doc);
    dialog.on('signed', function() {
      view.refresh();
    });
    dialog.show();
  },

  onAuthorDocument: function(button, e, eOpts) {
    var view = this;
    var vm = view.getViewModel();
    var doc = vm.get('document');
    var dialog = Ext.create('Tel100.view.document.comment.Author', { modal: true });
    dialog.getViewModel().set('document', doc);
    dialog.on('authored', function() {
      view.refresh();
    });
    dialog.show();
  },

  onPanelCommentadded: function(panel) {
    var commentsPanel = this.down('documentcommentpanel');
    commentsPanel.refresh(function() {
      commentsPanel.setCollapsed(false);
    });
  },

  initComponent: function() {
    this.callParent();
    var general = this.down('documenteditorgeneral');
    general.setReadonly(true);
  },

  refresh: function() {
    var view = this;
    var vm = view.getViewModel();
    var doc = vm.get('document');
    doc.load({
      callback: function() {
        var commentsPanel = view.down('documentcommentpanel');
        var treePanel = view.down('documentmotionstree');
        commentsPanel.refresh();
        treePanel.refresh();
      }
    });
  }

});