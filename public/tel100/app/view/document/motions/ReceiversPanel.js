Ext.define('Tel100.view.document.motions.ReceiversPanel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionsreceiverspanel',

  controller: 'documentmotionsreceiverspanel',
  viewModel: {
    type: 'documentmotionsreceiverspanel'
  },

  hideHeaders: true,
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.receivers} ({receiverCount})',
    store: '{receivers}',
    selection: '{selection}',
  },
  columns: [{
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.renderer.renderMotion(record, { as: 'receiver' });
    },
    dataIndex: 'name',
    text: 'name',
    flex: 1
  }],

  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onRefresh'
    }
  }, {
    xtype: 'tool',
    type: 'plus',
    listeners: {
      click: 'onAddAssignee'
    }
  }],

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

  onRefresh: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  onAddAssignee: function(tool, e, owner, eOpts) {
    var view = this;
    var vm = this.getViewModel();
    var dialog = Ext.create('Tel100.view.document.motions.AssigneeAddDialog', {
      modal: true,
    });
    dialog.setDocument(vm.get('document'));
    dialog.show();
    dialog.on('motionssent', function() {
      view.refresh();
      vm.get('document').load();
    });
  },

  onStoreLoad: function(store, records, successful, eOpts) {
    var vm = this.getViewModel();
    vm.set('receiverCount', this.getStore().count());
  },

  refresh: function() {
    this.getStore().load();
  }
});

Ext.define('Tel100.view.document.motions.ReceiversPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsreceiverspanel',

  onStoreLoad: function(store, records, successful, eOpts) {
  }
});

Ext.define('Tel100.view.document.motions.ReceiversPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsreceiverspanel',

  data: {
    receiverCount: 0,
    selection: null
  },

  stores: {
    receivers: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}'
        },
        url: '/api/documents/motion/assignees',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onStoreLoad'
      }
    }
  },

  formulas: {
    hideQuickProperties: function(get) {
      var selection = get('selection');
      return !selection || (selection && selection.get('type') === 'document');
    }
  }
});
