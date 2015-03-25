/*
 * File: app/view/document/Main.js
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

Ext.define('Tel100.view.document.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmain',

  requires: [
    'Tel100.view.document.MainViewModel',
    'Tel100.view.document.MainViewController',
    'Tel100.view.document.folder.Tab',
    'Tel100.view.document.grid.Panel',
    'Ext.tab.Panel',
    'Ext.tab.Tab',
    'Ext.grid.Panel'
  ],

  controller: 'documentmain',
  viewModel: {
    type: 'documentmain'
  },
  layout: 'border',

  items: [
    {
      xtype: 'documentfoldertab',
      width: 250,
      collapsible: true,
      region: 'west',
      split: true
    },
    {
      xtype: 'tabpanel',
      region: 'center',
      border: false,
      itemId: 'documentTabs',
      activeTab: 0,
      items: [
        {
          xtype: 'panel',
          dockedItems: [
            {
              xtype: 'toolbar',
              dock: 'top',
              items: [
                {
                  handler: 'onRefresh',
                  bind: {
                    text: '{i18n.document.base.ui.refresh}'
                  }
                },
                {
                  handler: 'onNewDocument',
                  cls: 'success-button',
                  bind: {
                    text: '{i18n.document.base.ui.newDocument}'
                  }
                },
                '->',
                {
                  handler: 'onDeleteDraft',
                  cls: 'danger-button',
                  bind: {
                    text: '{i18n.document.base.ui.deleteDraft}',
                    disabled: '{deleteDraftButtonDisabled}'
                  }
                }
              ]
            }
          ],
          border: false,
          layout: 'fit',
          bind: {
            title: '{i18n.document.base.ui.documents}'
          },
          items: [
            {
              xtype: 'documentgridpanel',
              bind: {
                selection: '{selection}'
              },
              listeners: {
                itemdblclick: 'onGridDoubleClick'
              }
            }
          ]
        }
      ]
    }
  ]

});