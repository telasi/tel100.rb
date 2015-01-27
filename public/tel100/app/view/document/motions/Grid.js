/*
 * File: app/view/document/motions/Grid.js
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

Ext.define('Tel100.view.document.motions.Grid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionsgrid',

  requires: [
    'Tel100.view.document.motions.GridViewModel',
    'Ext.grid.column.Column'
  ],

  viewModel: {
    type: 'documentmotionsgrid'
  },

  columns: [
    {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return helpers.document.status.motionStatusIcon(status, record);
      },
      resizable: false,
      width: 28,
      sortable: false,
      dataIndex: 'status',
      hideable: false
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'ordering',
      width: 48,
      sortable: false,
      hideable: false,
      bind: {
        text: '{i18n.document.motion.orderingShort}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'receiverName',
      sortable: false,
      hideable: false,
      flex: 1,
      bind: {
        text: '{i18n.document.motion.receiver}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 100,
      sortable: false,
      dataIndex: 'due_date',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.due_date}'
      }
    }
  ]

});