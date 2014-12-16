/*
 * File: app/view/document/type/grid/Panel.js
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

Ext.define('Tel100.view.document.type.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documenttypegridpanel',

  requires: [
    'Tel100.view.document.type.grid.PanelViewModel',
    'Tel100.view.document.type.grid.PanelViewController',
    'Ext.grid.View',
    'Ext.grid.column.Column',
    'Ext.panel.Tool'
  ],

  controller: 'documenttypegridpanel',
  viewModel: {
    type: 'documenttypegridpanel'
  },

  bind: {
    title: '{i18n.admin.documents.types}',
    store: '{types}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      width: 50,
      sortable: false,
      dataIndex: 'order_by',
      menuDisabled: true,
      bind: {
        text: '{i18n.document.type.order_by}'
      }
    },
    {
      xtype: 'gridcolumn',
      sortable: false,
      dataIndex: 'name',
      menuDisabled: true,
      flex: 1,
      bind: {
        text: '{i18n.document.type.name}'
      }
    }
  ],
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      bind: {
        tooltip: '{i18n.actions.refresh}'
      },
      listeners: {
        click: 'onRefersh'
      }
    }
  ]

});