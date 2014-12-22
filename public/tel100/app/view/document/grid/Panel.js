Ext.define('Tel100.view.document.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentgridpanel',

  requires: [
    'Tel100.view.document.grid.PanelViewModel',
    'Tel100.view.document.grid.PanelViewController',
    'Ext.grid.View',
    'Ext.grid.column.Column',
    'Ext.panel.Tool'
  ],

  controller: 'documentgridpanel',
  viewModel: {
    type: 'documentgridpanel'
  },

  bind: {
    title: '{i18n.document.base.ui.gridtitle}',
    store: '{documents}'
  },
  columns: [
    {
      xtype: 'gridcolumn',
      dataIndex: 'docnumber',
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
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return record.getType().get('name');
      },
      dataIndex: 'type',
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
      width: 200,
      dataIndex: 'subject',
      bind: {
        text: '{i18n.document.base.subject}'
      }
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'page_count',
      text: 'Page_count'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'additions_count',
      text: 'Additions_count'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'due_date',
      text: 'Due_date'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'sender_user_id',
      text: 'Sender_user_id'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'sender_id',
      text: 'Sender_id'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'sender_type',
      text: 'Sender_type'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'owner_user_id',
      text: 'Owner_user_id'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'owner_id',
      text: 'Owner_id'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'owner_type',
      text: 'Owner_type'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'motions_total',
      text: 'Motions_total'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'motions_completed',
      text: 'Motions_completed'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'motions_canceled',
      text: 'Motions_canceled'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'comments_total',
      text: 'Comments_total'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'created_at',
      text: 'Created_at'
    },
    {
      xtype: 'gridcolumn',
      dataIndex: 'updated_at',
      text: 'Updated_at'
    }
  ],
  listeners: {
    beforerender: 'onBeforeRender',
    celldblclick: 'onDoubleClick'
  },
  tools: [
    {
      xtype: 'tool',
      type: 'refresh',
      listeners: {
        click: 'onRefresh'
      }
    }
  ]

});