/*
 * File: app/view/document/folder/Main.js
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

Ext.define('Tel100.view.document.folder.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentfoldermain',

  requires: [
    'Tel100.view.document.folder.MainViewModel',
    'Tel100.view.document.folder.MainViewController',
    'Ext.panel.Tool',
    'Ext.grid.Panel',
    'Ext.grid.column.Column',
    'Ext.grid.View'
  ],

  controller: 'documentfoldermain',
  viewModel: {
    type: 'documentfoldermain'
  },
  width: 300,
  collapsible: true,

  bind: {
    title: '{i18n.document.folder.ui.folders}'
  },
  tools: [
    {
      xtype: 'tool',
      type: 'gear',
      listeners: {
        click: 'onToolClick'
      }
    }
  ],
  items: [
    {
      xtype: 'gridpanel',
      itemId: 'standardFolders',
      header: false,
      bind: {
        title: '{i18n.document.folder.ui.folders}',
        store: '{folders}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          flex: 1,
          bind: {
            text: '{i18n.document.folder.categories.a}'
          }
        }
      ],
      listeners: {
        select: 'onstandardGridpanelSelect'
      }
    },
    {
      xtype: 'gridpanel',
      itemId: 'customFolders',
      header: false,
      title: 'My Grid Panel',
      store: 'CustomFolders',
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          tdCls: 'foldercls',
          flex: 1,
          bind: {
            text: '{i18n.document.folder.categories.b}'
          }
        }
      ],
      listeners: {
        afterrender: 'onGridpanelAfterRender',
        select: 'onCustomFoldersSelect'
      }
    }
  ],
  listeners: {
    beforerender: 'onPanelBeforeRender'
  }

});