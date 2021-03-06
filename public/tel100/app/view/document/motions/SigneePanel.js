Ext.define('Tel100.view.document.motions.SigneePanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionssigneepanel',

  controller: 'documentmotionssigneepanel',
  viewModel: {
    type: 'documentmotionssigneepanel'
  },
  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.signees} ({assigneeCount})'
  },

  items: [{
    xtype: 'gridpanel',
    bind: {
      selection: '{selection}',
      store: '{motions}',
      disabled: '{!editable}'
    },
    viewConfig: {
      getRowClass: function(record, rowIndex, rowParams, store) {
        var status = record.get('status');
        return helpers.document.status.motionStatusRowClass(status, record);
      }
    },
    columns: [{
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return helpers.document.status.motionStatusIcon(value, record);
      },
      draggable: false,
      resizable: false,
      width: 32,
      sortable: false,
      dataIndex: 'status',
      hideable: false,
      text: ''
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
        maxValue: 999,
        minValue: 1
      }
    }, {
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return helpers.document.status.motionReceiverName(value, record);
      },
      draggable: false,
      width: 200,
      sortable: false,
      dataIndex: 'receiverName',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.receiver}'
      }
    }, {
      xtype: 'gridcolumn',
      draggable: false,
      width: 200,
      sortable: false,
      dataIndex: 'motion_text',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.motion_text}'
      },
      editor: {
        xtype: 'textarea'
      }
    }, {
      xtype: 'gridcolumn',
      draggable: false,
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
        format: 'd/m/Y'
      }
    }],
    listeners: {
      beforeitemcontextmenu: 'onGridBeforeItemContextMenu',
      edit: {
        fn: 'onEdit',
        scope: 'controller'
      }
    },
    plugins: [{
      ptype: 'rowediting',
      clicksToEdit: 1
    }]
  }],
  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onRefreshToolClick'
    }
  }, {
    xtype: 'tool',
    type: 'plus',
    listeners: {
      click: 'onAddToolClick'
    },
    bind: {
      hidden: '{!editable}'
    }
  }],

  onGridBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    if (record.get('status') === helpers.document.status.DRAFT) {
      var gridMenu = Ext.create('Ext.menu.Menu', {
        items: [{
          text: i18n.document.motion.actions.delete_signee,
          icon: '/images/delete.png',
          handler: function() {
            var view = dataview.up('documentmotionssigneepanel');
            view.deleteItemAt(index);
          }
        }]
      });

      e.stopEvent();
      gridMenu.showAt(e.getXY());
    }
  },

  onRefreshToolClick: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  onAddToolClick: function(tool, e, owner, eOpts) {
    var view = this;
    var dialog = helpers.party.getPartyDialog(function(assignees) {
      view.getController().addReceivers(assignees);
    });
    dialog.show();
  },

  refresh: function() {
    var vm = this.getViewModel();
    vm.getStore('motions').load();
  },

  initComponent: function() {
    this.callParent();
    var view = this;
    var viewModel = this.getViewModel();
    viewModel.bind('{motions}', function(store) {
      if (store) {
        store.view = view;
        store.viewModel = viewModel;
      }
    });
  },

  getGrid: function() {
    return this.down('gridpanel');
  },

  deleteItemAt: function(index) {
    var view = this;
    var store = view.getViewModel().getStore('motions');
    var item = store.getAt(index);
    helpers.api.document.motion.deleteDraft(item.id, {
      success: function() {
        view.refresh();
        view.fireEvent('datachanged', view, 'delete');
      }
    });
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
