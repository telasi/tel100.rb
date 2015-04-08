/*
 * File: app/view/document/grid/Panel.js
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

Ext.define('Tel100.view.document.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentgridpanel',

  requires: [
    'Tel100.view.document.grid.PanelViewModel',
    'Tel100.view.document.grid.PanelViewController',
    'Ext.grid.View',
    'Ext.grid.plugin.DragDrop',
    'Ext.util.Point',
    'Ext.grid.column.Column'
  ],

  controller: 'documentgridpanel',
  viewModel: {
    type: 'documentgridpanel'
  },
  border: false,

  bind: {
    store: '{documents}'
  },
  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store) {
      var status = record.get('status');
      var statusClass = helpers.document.status.documentStatusRowClass(status, record);
      var isChanged = record.get('is_changed');
      if (isChanged) {
        return statusClass + ' text-unread';
      } else {
        return statusClass;
      }
    },
    plugins: [
      {
        ptype: 'gridviewdragdrop',
        pluginId: 'draganddropplug',
        ddGroup: 'Grid2FolderDDGroup',
        enableDrop: false
      }
    ]
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
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.get('as_signee') === 1) {
          return '<strong class="text-danger">' + i18n.document.comment.actions.sign +'</strong>';
        } else if (record.get('as_author') === 1) {
          return '<strong class="text-danger">' + i18n.document.comment.actions.author +'</strong>';
        }
      },
      lockable: true,
      locked: true,
      bind: {
        text: '{i18n.document.base.actions}'
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
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'original_number',
      bind: {
        text: '{i18n.document.base.original_number}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'original_date',
      formatter: 'date("d/m/Y")',
      bind: {
        text: '{i18n.document.base.original_date}'
      }
    },
    {
      xtype: 'gridcolumn',
      width: 200,
      dataIndex: 'sender_name',
      bind: {
        text: '{i18n.document.base.sender_name}'
      }
    }
  ],
  listeners: {
    beforeitemcontextmenu: 'onGridpanelBeforeItemContextMenu',
    afterrender: 'onGridpanelAfterRender'
  },

  refresh: function(opts) {
    var grid = this;
    var store = grid.getStore();
    store.load(opts);
  }

});