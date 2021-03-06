Ext.define('Tel100.view.document.motions.InGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionsingrid',

  config: {
    selection: null
  },

  viewModel: {
    type: 'documentmotionsingrid'
  },

  publishes: [
    'selection'
  ],

  bodyBorder: true,

  bind: {
    selection: '{selection}',
    store: '{motions}'
  },

  // colums: [{
  //     xtype: 'gridcolumn',
  //     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
  //       return helpers.document.status.motionStatusIcon(value, record);
  //     },
  //     draggable: false,
  //     width: 28,
  //     sortable: false,
  //     dataIndex: 'status',
  //     emptyCellText: '',
  //     hideable: false
  //   },
  //   {
  //     xtype: 'gridcolumn',
  //     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
  //       if (record.get('type') === 'motion') {
  //         return value;
  //       } else {
  //         var vm = this.getViewModel();
  //         var doc = vm.get('document');
  //         var numb = doc.get('docnumber');
  //         var senderName = doc.get('sender_name');
  //         return '<strong>#' + numb + '</strong>: ' + senderName;
  //       }
  //     },
  //     draggable: false,
  //     width: 200,
  //     sortable: false,
  //     dataIndex: 'senderName',
  //     hideable: false,
  //     bind: {
  //       text: '{i18n.document.motion.sender}'
  //     }
  //   },
  //   {
  //     xtype: 'gridcolumn',
  //     draggable: false,
  //     width: 200,
  //     sortable: false,
  //     dataIndex: 'motion_text',
  //     hideable: false,
  //     bind: {
  //       text: '{i18n.document.motion.motion_text}'
  //     }
  //   },
  //   {
  //     xtype: 'gridcolumn',
  //     draggable: false,
  //     width: 100,
  //     sortable: false,
  //     dataIndex: 'due_date',
  //     formatter: 'date("d/m/Y")',
  //     hideable: false,
  //     bind: {
  //       text: '{i18n.document.motion.due_date}'
  //     }
  //   }
  // ],

  columns: [{
    xtype: 'gridcolumn',
    bind: {
      text: '{i18n.document.motion.sender}'
    },
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      if (record.get('type') == 'document') {
        return helpers.document.renderer.renderDocument(record);
      } else {
        return helpers.document.renderer.renderMotion(record);
      }
    },
    flex: 1
  }],

  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store) {
      var status = record.get('status');
      return helpers.document.status.motionStatusRowClass(status, record);
    }
  },

  refresh: function() {
    var self = this;
    self.setLoading(true);
    this.getStore().load({
      callback: function() {
        self.setLoading(false);
      }
    });
  },

  initComponent: function() {
    this.callParent();
    var self = this;
    var vm = this.getViewModel();
    vm.bind('{selection}', function(motion) {
      vm.set('activeMotion', self.getActiveMotion());
    });
    vm.bind('{motions}', function(store) {
      store.on('load', function() {
        vm.set('activeMotion', self.getActiveMotion({ store: store }));
      });
    });
  },

  getActiveMotion: function(opts) {
    var vm = this.getViewModel();
    var selection = vm.get('selection');
    if (selection) {
      return selection;
    } else {
      var store = (opts && opts.store) || this.getStore();
      if (store && store.getCount() > 0) {
        return store.getAt(0);
      }
      return null;
    }
  }
});
