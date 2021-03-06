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
    selection: '{selection}'
  },
  columns: [{
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.renderer.renderMotion(record, { as: 'receiver' });
    },
    dataIndex: 'name',
    text: 'name',
    flex: 1
  }, {
    xtype: 'actioncolumn',
    width: 60,
    items: [{
      icon: '/images/comment.png',
      handler: function(grid, rowIndex, colIndex) {
        var view = grid.up('documentmotionsreceiverspanel');
        var ctrl = view.getController();
        var vm = view.getViewModel();
        var doc = vm.get('document');
        var motions = vm.get('receivers');
        motion = motions.getAt(rowIndex);
        ctrl.onResult(doc, motion);
      }
    }],
    bind:{
      hidden: '{!editable}'
    }
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
    },
    bind: {
      hidden: '{!editable}'
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
  },

  setEditable: function(editable) {
    var vm = this.getViewModel();
    vm.set('editable', editable);
  },

  getEditable: function() {
    var vm = this.getViewModel();
    return vm.get('editable');
  }
});

Ext.define('Tel100.view.document.motions.ReceiversPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsreceiverspanel',

  onStoreLoad: function(store, records, successful, eOpts) {},

  onResult: function(doc, motion) {
    var oper = 'comment';
    if (motion.get('type') == 'document') { motion = null; }

    var view = this.getView();

    var dialog = helpers.document.motion.getResultDialog({
      document: doc,
      motion: motion,
      operation: oper
    });

    dialog.on('commentadded', function() {
      view.refresh();
      view.fireEvent('commentadded');
    });
    dialog.show();
  }
});

Ext.define('Tel100.view.document.motions.ReceiversPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsreceiverspanel',

  data: {
    receiverCount: 0,
    selection: null,
    editable: true
  },

  stores: {
    receivers: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}',
          change_no: '{change_no}'
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
