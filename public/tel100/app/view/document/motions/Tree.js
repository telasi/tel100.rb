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

  viewConfig: {},

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

Ext.define('Tel100.view.document.motions.TreeViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionstree',

  data: {
    selection: null
  },

  stores: {
    motions: {
      type: 'tree',
      rootVisible: true,
      root: {
        expanded: true
      },
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}'
        },
        url: '/api/documents/motion/tree',
        reader: {
          type: 'json'
        }
      },
      fields: [ 'id', 'sender', 'receiver', 'status', 'ordering' ]
    }
  },

  formulas: {
    disableProperties: function(get) {
      return !get('selection');
    },

    hideQuickProperties: function(get) {
      return !get('selection');
    }
  }
});
