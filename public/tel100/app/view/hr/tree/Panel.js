Ext.define('Tel100.view.hr.tree.Panel', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hrtreepanel',
  controller: 'hrtreepanel',

  viewModel: {
    type: 'hrtreepanel'
  },

  bodyCls: 'x-tree-noicon',
  autoLoad: true,
  enableColumnHide: false,
  hideHeaders: true,
  rowLines: true,
  lines: false,
  rootVisible: false,
  useArrows: true,

  bind: {
    title: '{i18n.hr.tree.title}',
    store: '{structure}'
  },

  viewConfig: {},

  columns: [{
    xtype: 'treecolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      if (record.toHtml) {
        return record.toHtml();
      } else {
        return '<i class="fa fa-bolt"></i> ' + i18n.application.telasi;
      }
    },
    dataIndex: 'name',
    flex: 1
  }],

  listeners: {
    beforeload: 'onTreepanelBeforeLoad',
    load: 'onTreepanelLoad',
    afterrender: 'onTreepanelAfterRender',
    startsearch: 'onTreepanelStartsearch'
  },

  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onRefresh'
    }
  }],

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      xtype: 'textfield',
      itemId: 'searchField',
      fieldLabel: 'Label',
      hideLabel: true,
      listeners: {
        change: 'onSearchFieldChange',
        specialkey: 'onSearchFieldSpecialkey'
      }
    }, {
      xtype: 'button',
      text: '<i class="fa fa-search"></i>',
      listeners: {
        click: 'onSearchButtonClick'
      }
    }, {
      xtype: 'button',
      disabled: true,
      itemId: 'nextbutton',
      text: '<i class="fa fa-forward"></i>',
      listeners: {
        click: 'onNextSearchButtonClick'
      }
    }]
  }],

  refresh: function() {
    this.getStore('structure').load();
  }
});
