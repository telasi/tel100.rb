/*
 * File: app/view/document/editor/Editor.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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
              handler: function(button, e) {
                var view = this.up('documenteditoreditor');

                var dialog = view.commentsDialog;
                if (!dialog) {
                  var vm = view.getViewModel();
                  var doc = vm.get('document');
                  dialog = Ext.create('Tel100.view.document.motions.ResponseDialog', {modal: true});
                  dialog.getViewModel().set('document', doc);
                  dialog.on('close', function() {
                    // TODO
                  });
                  view.commentsDialog = dialog;
                }

                var inMotionsPanel = view.down('documentmotionsinpanel');
                var activeMotion = inMotionsPanel.getActiveMotion();

                if (activeMotion) {
                  var comment = Ext.create('Tel100.model.document.Comment', {
                    type: 'comment',
                    text: ''
                  });
                  dialog.getViewModel().set('comment', comment);
                  dialog.getViewModel().set('motion', activeMotion);
                  dialog.show();
                }
              },
              bind: {
                text: '{i18n.document.motion.respond}'
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
              layout: 'accordion',
              items: [
                {
                  xtype: 'documenteditorgeneral',
                  bind: {
                    title: '{i18n.document.base.ui.generalTabTitle}'
                  }
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
              border: false,
              flex: 1,
              listeners: {
                motionchanged: 'onInMotionChanged'
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
    destroy: 'onDestroy'
  },

  initComponent: function() {
    this.callParent();
    var general = this.down('documenteditorgeneral');
    general.setReadonly(true);
  }

});