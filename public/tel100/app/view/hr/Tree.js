Ext.define('Tel100.view.hr.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hrtree',

  requires: [
    'Tel100.view.hr.TreeViewModel',
    'Tel100.view.hr.TreeViewController',
    'Ext.tree.View',
    'Ext.tree.Column',
    'Ext.panel.Tool'
  ],

  controller: 'hrtree',
  viewModel: {
    type: 'hrtree'
  },
  bodyCls: 'x-tree-noicon',
  hideHeaders: true,
  lines: false,
  rootVisible: false,
  useArrows: true,

  bind: {
    title: '<i class="fa fa-bolt"></i> {i18n.app.telasi}',
    store: '{hrstructure}'
  },

  columns: [{
    xtype: 'treecolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      if (record.toHRTreeHtml) {
        return record.toHRTreeHtml();
      } else {
        return '<i class="fa fa-bolt"></i> ' + Helpers.i18n().app.telasi;
      }
    },
    dataIndex: 'name',
    flex: 1
  }],

  tools: [{
    xtype: 'tool',
    type: 'refresh',
    handler: 'onRefresh'
  }]
});