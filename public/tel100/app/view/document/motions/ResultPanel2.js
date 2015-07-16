Ext.define('Tel100.view.document.motions.ResultPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsresultpanel2',

  controller: 'documentmotionsresultpanel2',
  viewModel: {
    type: 'documentmotionsresultpanel2'
  },

  autoScroll: true,
  layout: {
    type: 'vbox',
    align: 'middle',
    padding: 0
  },

  bind: {
    title: '{i18n.document.motion.resultPaneTitle}'
  },

  items: [{
    xtype: 'grid',
    flex: 1,
    width: '100%',
    hideHeaders: true,
    bind: {
      store: '{motions}',
      selection: '{selection}'
    },
    columns: [{
      dataIndex: 'html_text',
      flex: 1
    }, {
      xtype: 'actioncolumn',
      width: 60,
      items: [{
        icon: '/images/accept.png',
        getClass: function(v, meta, rec) {
          var status = rec.get('status');
          if (status != helpers.document.status.CURRENT) {
            return 'hidden';
          }
          return 'common';
        },
        handler: function(grid, rowIndex, colIndex) {
          var view = grid.up('documentmotionsresultpanel2');
          var ctrl = view.getController();
          var vm = view.getViewModel();
          var doc = vm.get('document');
          var motions = vm.get('motions');
          motion = motions.getAt(rowIndex);
          ctrl.onResult(doc, motion, 'accept');
        }
      }, {
        icon: '/images/cancel.png',
        getClass: function(v, meta, rec) {
          var status = rec.get('status');
          if (status != helpers.document.status.CURRENT) {
            return 'hidden';
          }
          return 'common';
        },
        handler: function(grid, rowIndex, colIndex) {
          var view = grid.up('documentmotionsresultpanel2');
          var ctrl = view.getController();
          var vm = view.getViewModel();
          var doc = vm.get('document');
          var motions = vm.get('motions');
          motion = motions.getAt(rowIndex);
          ctrl.onResult(doc, motion, 'cancel');
        }
      }, {
        icon: '/images/comment.png',
        handler: function(grid, rowIndex, colIndex) {
          var view = grid.up('documentmotionsresultpanel2');
          var ctrl = view.getController();
          var vm = view.getViewModel();
          var doc = vm.get('document');
          var motions = vm.get('motions');
          motion = motions.getAt(rowIndex);
          ctrl.onResult(doc, motion, 'comment');
        }
      }]
    }]
  }],

  listeners: {
  },

  tools: [{
    type: 'refresh',
    handler: function(evt, tool, header) {
      var view = header.up('documentmotionsresultpanel2');
      view.refresh();
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

  refresh: function() {
    var vm = this.getViewModel();
    vm.getStore('motions').load();
  }
});

Ext.define('Tel100.view.document.motions.ResultPanelViewModel2', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsresultpanel2',

  data: {
    selection: null
  },

  stores: {
    motions: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'in',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        // load: 'onMotionsStoreLoad'
      }
    },
  },

  formulas: {
    hideQuickProperties: function(get) {
      var selection = get('selection');
      return !selection || (selection && selection.get('type') === 'document');
    }
  }
});

Ext.define('Tel100.view.document.motions.ResultPanelViewController2', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsresultpanel2',

  onResult: function(doc, motion, oper) {
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
