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
    'Tel100.view.document.motions.InPanel',
    'Tel100.view.document.motions.OutPanel',
    'Ext.tab.Panel',
    'Ext.tab.Tab',
    'Ext.resizer.Splitter'
  ],

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
      tabPosition: 'bottom',
      items: [
        {
          xtype: 'panel',
          border: false,
          layout: 'fit',
          bind: {
            title: '{i18n.document.base.ui.contentTabTitle}'
          },
          items: [
            {
              xtype: 'container',
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
              flex: 1
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
  ]

});