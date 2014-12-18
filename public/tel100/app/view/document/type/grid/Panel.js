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
        click: 'onRefresh'
      }
    }
  ],

  refresh: function() {
    this.getController().onRefresh();
  }

});