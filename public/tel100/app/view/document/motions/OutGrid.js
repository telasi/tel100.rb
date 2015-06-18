Ext.define('Tel100.view.document.motions.OutGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentmotionsoutgrid',

  config: {
    hasDraftMotion: false
  },

  viewModel: {
    type: 'documentmotionsoutgrid'
  },
  publishes: [
    'selection',
    'hasDraftMotion'
  ],

  bind: {
    store: '{motions}'
  },

  columns: [{
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.status.motionStatusIcon(value, record);
    },
    resizable: false,
    width: 28,
    sortable: false,
    dataIndex: 'status',
    hideable: false
  }, {
    xtype: 'gridcolumn',
    width: 48,
    sortable: false,
    align: 'right',
    dataIndex: 'ordering',
    hideable: false,
    bind: {
      text: '{i18n.document.motion.orderingShort}'
    },
    editor: {
      xtype: 'numberfield',
      decimalPrecision: 0,
      maxValue: 999,
      minValue: 1
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      var receiver = record.get('receiver');
      var receiverUser = record.get('receiver_user');
      if (receiver && receiver.ext_type == 'hr.Organization') {
        return '<i class="fa fa-bank"></i> ' + value;
      } else if (receiverUser) {
        return '<i class="fa fa-user"></i> ' + receiverUser.first_name + ' ' + receiverUser.last_name;
      } else {
        return '<i class="fa fa-user"></i> ' + value;
      }
    },
    width: 200,
    sortable: false,
    dataIndex: 'receiverName',
    hideable: false,
    bind: {
      text: '{i18n.document.motion.receiver}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return i18n.document.role[value];
    },
    width: 110,
    sortable: false,
    dataIndex: 'receiver_role',
    hideable: false,
    bind: {
      text: '{i18n.document.motion.receiver_role}'
    },
    editor: {
      xtype: 'combobox',
      editable: false,
      displayField: 'localeField',
      valueField: 'name',
      bind: {
        store: '{roles}'
      }
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return record.get('send_type_name');
    },
    width: 150,
    sortable: false,
    dataIndex: 'send_type_id',
    hideable: false,
    bind: {
      text: '{i18n.document.motion.send_type}'
    },
    editor: {
      xtype: 'combobox',
      editable: false,
      displayField: 'html_name',
      valueField: 'id',
      bind: {
        store: '{responseTypes}'
      }
    }
  }, {
    xtype: 'gridcolumn',
    width: 200,
    sortable: false,
    dataIndex: 'motion_text',
    hideable: false,
    bind: {
      text: '{i18n.document.motion.motion_text}'
    },
    editor: {
      xtype: 'textfield'
    }
  }, {
    xtype: 'gridcolumn',
    width: 100,
    sortable: false,
    dataIndex: 'due_date',
    formatter: 'date("d/m/Y")',
    hideable: false,
    bind: {
      text: '{i18n.document.motion.due_date}'
    },
    editor: {
      xtype: 'datefield',
      altFormats: '',
      format: 'd/m/Y'
    }
  }],

  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store) {
      var status = record.get('status');
      return helpers.document.status.motionStatusRowClass(status, record);
    }
  },

  plugins: [{
    ptype: 'cellediting',
    clicksToEdit: 1
  }],

  refresh: function() {
    var vm = this.getViewModel();
    var parentId = vm.get('parentId');
    var store = this.getStore();

    /// XXX isEmptyStore is not listed as a API method
    if (!store.isEmptyStore) {
      var self = this;
      self.setLoading(true);
      store.load({
        params: { parent_id: parentId },
        callback: function() {
          self.setLoading(false);
        }
      });
    }
  },

  initComponent: function() {
    this.callParent();
    var vm = this.getViewModel();
    // setting view model for the motions store
    vm.bind('{motions}', function(store) {
      if (store) {
        store.viewModel = this;
      }
    });
  }
});

Ext.define('Tel100.view.document.motions.OutGridViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsoutgrid',

  data: {
    parentId: null
  },

  stores: {
    motions: {
      onStoreChanges: function() {
        var hasDraftMotion = false;

        for(var i = 0; i < this.getCount(); i++) {
          var motion = this.getAt(i);
          if (motion.get('status') === helpers.document.status.DRAFT) {
            hasDraftMotion = true;
            break;
          }
        }

        if (this.viewModel) {
          this.viewModel.set('hasDraftMotion', hasDraftMotion);
        }
      },

      listeners: {
        update: function() {
          this.onStoreChanges();
        },
        remove: function() {
          this.onStoreChanges();
        },
        datachanged: function() {
          this.onStoreChanges();
        }
      },

      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'out',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      }
    },

    roles: {
      data: [
        { name: 'assignee' },
        { name: 'signee' },
        { name: 'author' }
      ],
      fields: [{
        name: 'name'
      }, {
        calculate: function(data) {
          return i18n.document.role[data.name];
        },
        name: 'localeField'
      }]
    },

    responseTypes: {
      autoLoad: true,
      model: 'Tel100.model.document.ResponseType',
      proxy: {
        type: 'ajax',
        extraParams: {
          type: 'send'
        },
        url: '/api/documents/response_types',
        reader: {
          type: 'json'
        }
      }
    }
  }
});

Ext.define('Tel100.view.document.motions.OutGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsoutgrid'
});
