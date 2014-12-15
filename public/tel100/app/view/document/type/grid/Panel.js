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
    'Ext.grid.View',
    'Ext.grid.column.Column'
  ],

  viewModel: {
    type: 'documenttypegridpanel'
  },
  height: 250,
  width: 400,

  bind: {
    title: '{i18n.admin.documents.groupName} &gt; {i18n.admin.documents.types}',
    store: '{types}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      width: 50,
      dataIndex: 'order_by',
      bind: {
        text: '{i18n.document.type.order_by}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'name',
      flex: 1,
      bind: {
        text: '{i18n.document.type.name}'
      }
    }
  ]

});