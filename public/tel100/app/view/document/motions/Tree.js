Ext.define('Tel100.view.document.motions.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.documentmotionstree',

  config: {
    selection: null
  },

  viewModel: {
    type: 'documentmotionstree'
  },

  border: false,
  bodyBorder: false,
  bodyCls: 'x-tree-noicon',
  autoLoad: true,
  enableColumnHide: false,
  hideHeaders: true,
  rowLines: true,
  scroll: 'vertical',
  lines: false,
  useArrows: true,
  defaultListenerScope: true,

  bind: {
    selection: '{selection}',
    title: '{i18n.document.motion.tree}',
    store: '{motions}'
  },

  viewConfig: {

  },

  columns: [{
    xtype: 'treecolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      if (record.get('root')) {
        var grid = view.up('documentmotionstree');
        var vm = grid.getViewModel();
        var doc = vm.get('document');
        return helpers.document.renderer.renderDocument(doc);
      } else {
        return helpers.document.renderer.renderMotion(record);
      }
    },
    dataIndex: 'receiver',
    text: 'Receiver',
    flex: 1
  }],

  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onToolClick'
    }
  }],

  listeners: {
    beforecellcontextmenu: 'onTreepanelBeforeCellContextMenu'
  },

  dockedItems: [{
    xtype: 'documentmotionsmotionquickview',
    resizable: true,
    style: 'background-color: #dfeaf2;',
    dock: 'bottom',
    bind: {
      motion: '{selection}',
      hidden: '{hideQuickProperties}'
    }
  }],

  onToolClick: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  onTreepanelBeforeCellContextMenu: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    if (record.get('type') === 'motion') {
      var gridMenu = Ext.create('Ext.menu.Menu', {
        items: [{
          text: i18n.document.motion.properties,
          icon: '/images/properties.png',
          handler: function() {
            var dialog = helpers.document.motion.getPropertiesDialog(record);
            dialog.show();
          }
        }]
      });
      e.stopEvent();
      gridMenu.showAt(e.getXY());
    }
  },

  refresh: function() {
    var vm = this.getViewModel();
    var store = vm.get('motions');
    store.load();
  }
});
