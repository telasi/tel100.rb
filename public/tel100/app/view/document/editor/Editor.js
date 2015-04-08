/*
 * File: app/view/document/editor/Editor.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.document.editor.Editor', {
  extend: 'Ext.container.Container',
  alias: 'widget.documenteditoreditor',

  requires: [
    'Tel100.view.document.editor.EditorViewModel',
    'Tel100.view.document.editor.EditorViewController',
    'Tel100.view.document.editor.General',
    'Tel100.view.document.motions.ResultPanel',
    'Tel100.view.document.comment.Panel',
    'Tel100.view.document.motions.Tree',
    'Tel100.view.document.file.Panel',
    'Tel100.view.document.motions.InPanel',
    'Tel100.view.document.motions.OutPanel',
    'Ext.tab.Panel',
    'Ext.toolbar.Toolbar',
    'Ext.tab.Tab',
    'Ext.form.Panel',
    'Ext.tree.Panel',
    'Ext.resizer.Splitter'
  ],

  controller: 'documenteditoreditor',
  viewModel: {
    type: 'documenteditoreditor'
  },
  layout: 'border',
  defaultListenerScope: true,

  items: [
    {
      xtype: 'tabpanel',
      region: 'center',
      border: false,
      padding: '',
      activeTab: 0,
      deferredRender: false,
      tabPosition: 'bottom',
      dockedItems: [
        {
          xtype: 'toolbar',
          dock: 'top',
          items: [
            {
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
            },
            {
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
            },
            {
              xtype: 'button',
              bind: {
                hidden: '{hideSignButton}',
                text: '{i18n.document.comment.actions.sign}'
              },
              listeners: {
                click: 'onSignDocument'
              }
            }
          ]
        }
      ],
      items: [
        {
          xtype: 'panel',
          border: false,
          layout: 'border',
          bind: {
            title: '{i18n.document.base.ui.contentTabTitle}'
          },
          items: [
            {
              xtype: 'container',
              region: 'center',
              layout: 'border',
              items: [
                {
                  xtype: 'container',
                  region: 'north',
                  cls: 'document-subject',
                  bind: {
                    html: '{document.subject}'
                  }
                },
                {
                  xtype: 'container',
                  region: 'center',
                  cls: 'document-body',
                  overflowY: 'scroll',
                  bind: {
                    html: '{document.body}'
                  }
                }
              ]
            },
            {
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
                  xtype: 'documentmotionstree'
                },
                {
                  xtype: 'documentfilepanel'
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
    }
  ],
  listeners: {
    destroy: {
      fn: 'onDestroy',
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