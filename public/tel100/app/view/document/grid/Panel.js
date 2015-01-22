/*
 * File: app/view/document/grid/Panel.js
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

Ext.define('Tel100.view.document.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentgridpanel',

  requires: [
    'Tel100.view.document.grid.PanelViewModel',
    'Ext.grid.View',
    'Ext.grid.column.Column'
  ],

  viewModel: {
    type: 'documentgridpanel'
  },

  bind: {
    store: '{documents}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      dataIndex: 'docnumber',
      lockable: true,
      locked: true,
      bind: {
        text: '{i18n.document.base.docnumber}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 130,
      dataIndex: 'myStatusName',
      lockable: true,
      locked: true,
      bind: {
        text: '{i18n.document.base.my_status}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 130,
      dataIndex: 'statusName',
      bind: {
        text: '{i18n.document.base.status}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'docdate',
      formatter: 'date("d/m/Y")',
      bind: {
        text: '{i18n.document.base.docdate}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'typeName',
      bind: {
        text: '{i18n.document.base.type}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'directionName',
      bind: {
        text: '{i18n.document.base.direction}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 300,
      dataIndex: 'subject',
      bind: {
        text: '{i18n.document.base.subject}'
      }
    }
  ],

  refresh: function(opts) {
    var grid = this;
    var store = grid.getStore();
    store.load(opts);
  }

});