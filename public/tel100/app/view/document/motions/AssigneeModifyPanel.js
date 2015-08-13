Ext.define('Tel100.view.document.motions.AssigneeModifyPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsassigneemodifypanel',

  controller: 'documentmotionsassigneemodifypanel',
  viewModel: {
    type: 'documentmotionsassigneemodifypanel'
  },

  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.assignees}'
  },

  items: [{
    xtype: 'gridpanel',
    bind: {
      selection: '{selection}',
      store: '{motions}'
    },
    viewConfig: {
      getRowClass: function(record, rowIndex, rowParams, store) {
        var status = record.get('status');
        text = helpers.document.status.motionStatusRowClass(status, record);
        if(record.get('deleted')){
          return 'row-text-deleted';
        }
        
        return text;
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
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var vm = this.up().getViewModel();
        var st = vm.getStore('responseTypes');
        return st.getById(value).get('name');
      },
      defaultWidth: 150,
      sortable: false,
      dataIndex: 'send_type_id',
      hideable: false,
      bind: {
        text: '{i18n.document.motion.send_type}'
      },
      editor: {
        xtype: 'combobox',
        editable: false,
        displayField: 'name',
        valueField: 'id',
        bind: {
          store: '{responseTypes}'
        },
      },
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
      beforeedit: function(e, editor){
        return !editor.store.getAt(editor.rowIdx).get('deleted');
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
    }
  }],

  listeners: {
    beforerender: {
      fn: 'onBeforeRender',
      scope: 'controller'
    }
  },

  onGridBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    var gridMenu = Ext.create('Ext.menu.Menu', {
      items: [{
        text: i18n.document.motion.actions.delete_assignee,
        icon: '/images/delete.png',
        handler: function() {
          var view = dataview.up('documentmotionsassigneemodifypanel');
          view.deleteItemAt(index);
        }
      }]
    });

    e.stopEvent();
    gridMenu.showAt(e.getXY());
  },

  onRefreshToolClick: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  onAddToolClick: function(tool, e, owner, eOpts) {
    var view = this;
    var dialog = helpers.party.getPartyDialog(function(assignees) {
      view.getController().addTempReceivers(assignees);
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
    if(item.get('temp')){
      store.remove(item);
    } else {
      if(item.get('is_new') == 1 ){
       item.set('deleted', true);
      }
    }
  }
});
