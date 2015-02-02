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
    'Ext.tab.Panel',
    'Ext.tab.Tab'
  ],

  viewModel: {
    type: 'documenteditoreditor'
  },
  layout: 'border',

  items: [
    {
      xtype: 'tabpanel',
      region: 'center',
      padding: '',
      activeTab: 0,
      tabPosition: 'bottom',
      items: [
        {
          xtype: 'panel',
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
          bind: {
            title: '{i18n.document.base.ui.motionsTabTitle}'
          }
        }
      ]
    }
  ]

});