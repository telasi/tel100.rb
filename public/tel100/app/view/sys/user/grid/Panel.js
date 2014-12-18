Ext.define('Tel100.view.sys.user.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.sysusergridpanel',

  requires: [
    'Tel100.view.sys.user.grid.PanelViewModel',
    'Tel100.view.sys.user.grid.PanelViewController',
    'Ext.grid.column.Column',
    'Ext.panel.Tool'
  ],

  controller: 'sysusergridpanel_controller',
  viewModel: { type: 'sysusergridpanel_model' },
  bind: {
    title: '{i18n.admin.sys.users}'
  },

  columns: [{
    xtype: 'gridcolumn',
    dataIndex: 'username',
    width: 200,
    bind: {
      text: '{i18n.user.username}'
    }
  }, {
    xtype: 'gridcolumn',
    dataIndex: 'full_name',
    flex: 1,
    bind: {
      text: '{i18n.user.full_name}'
    }
  }],
  tools: [{
    xtype: 'tool',
    type: 'refresh',
    sortable: false,
    listeners: {
      click: 'onRefresh'
    }
  }]

  // listeners: {
  //   beforerender: 'onBeforeRender',
  //   celldblclick: 'onDoubleClick'
  // },
});