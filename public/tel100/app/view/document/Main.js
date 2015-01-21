/*
 * File: app/view/document/Main.js
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

Ext.define('Tel100.view.document.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmain',

  requires: [
    'Tel100.view.document.MainViewModel',
    'Tel100.view.document.MainViewController',
    'Tel100.view.document.folder.Panel',
    'Tel100.view.document.grid.Panel',
    'Ext.grid.Panel',
    'Ext.tab.Panel',
    'Ext.tab.Tab'
  ],

  controller: 'documentmain',
  viewModel: {
    type: 'documentmain'
  },
  layout: 'border',

  items: [
    {
      xtype: 'documentfolderpanel',
      collapsible: true,
      region: 'west',
      split: true
    },
    {
      xtype: 'tabpanel',
      region: 'center',
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
                  text: 'refresh',
                  handler: 'onRefresh'
                }
              ]
            }
          ],
          layout: 'fit',
          bind: {
            title: '{i18n.document.base.ui.documents}'
          },
          items: [
            {
              xtype: 'documentgridpanel'
            }
          ]
        }
      ]
    }
  ],

  openNewDocument: function() {
    var tabs = this.down('#documentTabs');
    var editor = Tel100.view.document.editor.Panel.create({title: i18n.document.base.ui.creatorTitle, closable: true});
    editor.getViewModel().set('document', Tel100.model.document.Base.create({
      type_id: 1,
      direction: 'inner'
    }));
    tabs.add(editor);
    tabs.setActiveTab(editor);
  }

});